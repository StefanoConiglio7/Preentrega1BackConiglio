import { error, log } from "console";
import fs from "fs"
class ProductManager {
    constructor() {
        this.path= "./src/data/products.json";
    }
    getproducts=async()=>{
        try {
            const productsJson= await fs.promises.readFile(this.path, "utf8");
            const products=JSON.parse(productsJson);
            return products;
        } catch (error) {
            error
        }
    }
    getproductById=async(id)=>{
        try {
            const productsJson= await fs.promises.readFile(this.path, "utf8");
            const products= JSON.parse(productsJson);
            const productid= products.find(p=> p.id===Number(id))
            return productid    
        } catch (error) {
            error
        }
    }
    addproduct=async(newProduct)=>{
        try {
            const productsJson= await fs.promises.readFile(this.path, "utf8");
            const products=JSON.parse(productsJson);
            if (newProduct.price && newProduct.stock) {
                newProduct.price = Number(newProduct.price);
                newProduct.stock = Number(newProduct.stock);
            }
            
            const id= Date.now()
            const productToAdd = {
                id,
                ...newProduct,
              };
          
              products.push(productToAdd);
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
            return productToAdd
        } catch (error) {
            error
        }
    }
    updateProduct=async(ParamId,updatedproduct)=>{
        try {
            const productsJson= await fs.promises.readFile(this.path, "utf8");
            const products=JSON.parse(productsJson);
            if (updatedproduct.price && updatedproduct.stock) {
                updatedproduct.price=Number(updatedproduct.price)
                updatedproduct.stock=Number(updatedproduct.stock)
              }
            
            const index= products.findIndex(p=> p.id==ParamId)
            if (index===-1) {
                console.error("Producto inexistente")
                return
            }
            products[index]={...products[index],...updatedproduct}
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
            return products[index]
        } catch (error) {
             error 
        }
    }
    deleteUserById= async(ParamId) => {
        try {
            const productsJson= await fs.promises.readFile(this.path, "utf8");
            const products=JSON.parse(productsJson);
            const existId= products.findIndex(product => product.id===Number(ParamId))
            if (existId===-1) {
                console.error("No existe")
                return
            }
            const filterId= products.filter(p=>p.id!==Number(ParamId))
            await fs.promises.writeFile(this.path, JSON.stringify(filterId,null,2));
            return filterId
        } catch (error) {
            error
        }
        
    }
    
}
export default ProductManager