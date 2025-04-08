import fs from "fs"

class CartManager {
    constructor() {
        this.path= "./src/cart.json"
        this.path2= "./src/products.json"
    }
    addToCart=async(newCart)=>{
        const cartJson= await fs.promises.readFile(this.path, "utf8")
        const cart=JSON.parse(cartJson)
        
        const Id= Date.now()
        cart.push({
            id: Id,
            ...newCart            
        })
        Object.defineProperty(cart[cart.length-1], "id", {
            writable:false,
            configurable:false
        })
        await fs.promises.writeFile(this.path, JSON.stringify(cart,null,2))
        return cart
    }
    getCartId= async (Id) => {
        const cartJson= await fs.promises.readFile(this.path, "utf8")
        const cart=JSON.parse(cartJson)
        const cartFound= cart.findIndex(c=> c.id ===Number(Id))
        if(cartFound===-1) {
            console.error("Carrito inexistente")
            return
        }
        return cart[cartFound]
    }
    addProductToCart= async (cartId, productId,newCart) => {
        const cartJson= await fs.promises.readFile(this.path, "utf8")
        const cart=JSON.parse(cartJson)
        const productsJson= await fs.promises.readFile(this.path2, "utf8");
        const products= JSON.parse(productsJson)
        const selectedproduct= products.find(p=> p.id=== Number(productId))
        const selectedproductId= selectedproduct.id
        const selectedcart= cart.find(c=> c.id === Number(cartId))
        const altcart= {...newCart}
        const existingproduct= selectedcart.products.find(e=> e.product=== Number(productId))
        if(
            typeof altcart.product === "string"|| 
            typeof altcart.product === "number"||
            typeof altcart.product === "boolean"||
            typeof altcart.product !== "string"|| 
            typeof altcart.product !== "number"||
            typeof altcart.product !== "boolean"
        ){
            altcart.product= selectedproductId
        }
        if (existingproduct) {
            existingproduct.quantity+=1
        }else{
            selectedcart.products.push(altcart)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cart,null,2))
        return cart
    }
}
export default CartManager