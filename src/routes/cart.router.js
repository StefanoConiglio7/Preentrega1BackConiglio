import express from "express";
import Cart from "../models/cart.model.js";

const cartRouter = express.Router();

cartRouter.post("/", async(req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get("/:cid", async(req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findOne({ _id: cid }).populate("products.product");
    if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex === -1) return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
cartRouter.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    cart.products = products.map(product => ({
      product: product.product,
      quantity: product.quantity
    }));
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex === -1) return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    cart.products = [];
    await cart.save();
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default cartRouter;