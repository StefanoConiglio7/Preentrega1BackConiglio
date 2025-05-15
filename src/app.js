import express from "express";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import http from "http"
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import connectMongoDB from "./config/db.js";
import Product from "./models/products.model.js";


const app = express();
const server= http.createServer(app)
const io= new Server(server)
const PORT= 7070
app.use(express.json());
app.use(express.static("public"))
connectMongoDB();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/", viewsRouter)

io.on("connection", (socket)=> {
  console.log("Nuevo usuario conectado");

  socket.on("newProduct", async(productData)=> {
    try {
      console.log("Datos recibidos del cliente:", productData)
      const newProduct = new Product(productData);
      await newProduct.save();
      io.emit("productAdded", newProduct);
    } catch (error) {
      console.error("Error al añadir el producto");
    }
  });
  socket.on("deleteProduct", async (productId) => {
    try {
      await Product.findByIdAndDelete(productId);
      io.emit("productDeleted", productId);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  });
});

server.listen(PORT, ()=> console.log(`Servidor iniciado en: http://localhost:${PORT}`) );