import { error } from "console";
import fs from "fs"
class ProductManager {
    constructor() {
        this.path= "./src/data/products.json";
    }
    getproducts=async()=>{
        const productsJson= await fs.promises.readFile(this.path, "utf8");
        const products=JSON.parse(productsJson);
        return products;
    }
    getproductById=async(id)=>{
        const productsJson= await fs.promises.readFile(this.path, "utf8");
        const products= JSON.parse(productsJson);
        const productid= products.find(p=> p.id===Number(id))
        return productid
    }
    addproduct=async(newProduct)=>{
        const productsJson= await fs.promises.readFile(this.path, "utf8");
        const products=JSON.parse(productsJson);
        if (newProduct.price && newProduct.stock) {
          Number(newProduct.price)
          Number(newProduct.stock)
        }
        const id= Date.now()
        products.push({
            id,
            ...newProduct
        })
        Object.defineProperty(products[products.length-1], "id", {
            writable:false,
            configurable:false
        })
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
        return products
    }
    updateProduct=async(ParamId,updatedproduct)=>{
        const productsJson= await fs.promises.readFile(this.path, "utf8");
        const products=JSON.parse(productsJson);
        if (
            typeof updatedproduct.title !== "string" || 
            typeof updatedproduct.description !== "string" || 
            typeof updatedproduct.code !== "string" || 
            typeof updatedproduct.price !== "number" ||  
            typeof updatedproduct.stock !== "number" || 
            typeof updatedproduct.category !== "string" 
        ) {
            console.error("Ingrese bien los datos");
            return;
        }
        
        const index= products.findIndex(p=> p.id==ParamId)
        if (index===-1) {
            console.error("Producto inexistente")
            return
        }
        products[index]={...products[index],...updatedproduct}
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
        return products[index]
    }
    deleteUserById= async(ParamId) => {
        const productsJson= await fs.promises.readFile(this.path, "utf8");
        const products=JSON.parse(productsJson);
        const existId= products.findIndex(product => product.id===Number(ParamId))
        if (existId===-1) {
            console.error("Producto inexistente")
            return
        }
        const filterId= products.filter(p=>p.id!==Number(ParamId))
        await fs.promises.writeFile(this.path, JSON.stringify(filterId,null,2));
        return filterId
        
    }
    
}
export default ProductManager