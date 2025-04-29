import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const data = await productManager.getproducts();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

productsRouter.get("/:pid", async (req, res) => {
  try {
    const id= req.params.pid
    const products = await productManager.getproductById(id);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addproduct(newProduct);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = req.body;
    const products = await productManager.updateProduct(req.params.pid, updatedProduct);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteUserById(req.params.pid);
    res.status(200).send({ message: `Producto con id: ${req.params.pid} eliminado` });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default productsRouter;