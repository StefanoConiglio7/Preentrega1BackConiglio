import express from "express";
import Product from "../models/products.model.js";


const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const products = await Product.paginate({}, { limit, page});
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

productsRouter.get("/productsfilter", async (req, res) => {
  try {
    const { query, sort } = req.query;

    const filter = query ? { category: query } : {};

    const products = await Product.aggregate([
      { $match: filter },
      { $sort: sort ? { price: sort === "asc" ? 1 : -1 } : {} },
      { $project: {  title: 1, description: 1, category: 1, price: 1 } }
    ]);

    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: `Producto con id: ${req.params.pid} eliminado` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default productsRouter;