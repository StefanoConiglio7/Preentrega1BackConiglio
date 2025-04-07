import express from "express";
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"

const app = express();
app.use(express.json());

const productManager = new ProductManager()
const cartmanager= new CartManager()
//Get
app.get('/api/products', async(req, res)=> {
  const products = await productManager.getproducts();
  res.status(200).json({ products, message: "Productos" });
});
app.get("/api/products/:id", async(req, res)=> {
  const productId = req.params.id;
  const product = await productManager.getproductById(productId);
  if(!product){
    res.status(404).json({ message: "Producto no encontrado" });
    return;
  }
  res.status(200).json({product, message: "Producto" });
})
app.get("/api/cart/:id", async(req,res)=>{
  const cartId= req.params.id
  const cart= await cartmanager.getCartId(cartId)
  if (!cart) {
    res.status(404).json({ message: "Carrito no encontrado" });
    return;
  }
  res.status(200).json({cart,message: "carrito"})
})
//Post
app.post("/api/products", async(req, res)=> {
  const newProduct = req.body;
  const products = await productManager.addproduct(newProduct);
  res.status(201).json({ products, message: "nuevo producto creado" });
});
app.post("/api/cart", async(req,res)=>{
  const newCart= req.body
  const cart= await cartmanager.addToCart(newCart)
  res.status(201).json({cart,message: "carrito creado"})
})
app.post("/api/cart/:cid/product/:pid",async(req,res)=>{
  const cartId= req.params.cid
  const productId= req.params.pid
  const newCart= req.body
  const cart= await cartmanager.addProductToCart(cartId,productId,newCart)
  res.status(201).json({cart,message: "Producto añadido con exito"})
})
//Put
app.put("/api/products/:id", async(req,res)=>{
  const productId= req.params.id
  const productData= req.body
  const products= await productManager.updateProduct(productId,productData)
  res.status(200).json({products, message:"producto actualizado"})
})
//Delete
app.delete("/api/products/:id",async(req,res)=>{
  const productId= req.params.id
  const products= await productManager.deleteUserById(productId)
  res.status(200).json({products, message:"producto eliminado"})
})
app.listen(8080, ()=> {
  console.log("Servidor iniciado en puerto 8080");
});