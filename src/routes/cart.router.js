import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager();

cartRouter.post("/", async(req, res) => {
  try {
    const newCart= req.body
    const carts = await cartManager.addToCart(newCart);
    res.status(201).send(carts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.get("/:cid", async(req, res) => {
  try {
    const cartId= req.params.id 
    const cartProducts = await cartManager.getCartId(cartId);
    res.status(200).send(cartProducts);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async(req, res) => {
  try {
    const cartId= req.params.cid
    const productId= req.params.pid
    const newCart= req.body
    const updatedCart = await cartManager.addProductToCart(cartId,productId,newCart);
    res.status(201).send(updatedCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default cartRouter;