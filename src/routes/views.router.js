import express from "express";
import Product from "../models/products.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res)=> {
  try{
    const limit = 10
    const page = Number(req.query.page) || 1;
    const products = await Product.paginate({}, { limit, page, lean: true });
    res.render("home", { ...products });
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async(req, res)=> {
  try{
    const limit = 15
    const page = Number(req.query.page) || 1;
    const products = await Product.paginate({}, { limit, page, lean: true });
    res.render("realTimeProducts", { ...products });
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});
viewsRouter.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.render("detail", { product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default viewsRouter;