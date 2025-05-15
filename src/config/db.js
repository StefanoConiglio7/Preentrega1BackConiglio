import mongoose from "mongoose";

const connectMongoDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://Coniglio:coder@cluster0.y9vevlm.mongodb.net/TrabajoFinal?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Conectado con MongoDB!");
  } catch (error) {
    console.log("Error al conectar con mongodb");
  }
}

export default connectMongoDB;