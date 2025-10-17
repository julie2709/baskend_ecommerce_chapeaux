import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion MongoDB réussie ✅");
    await mongoose.connection.close();
  } catch (err) {
    console.error("Erreur de connexion MongoDB ❌ :", err.message);
  }
};

testConnection();
