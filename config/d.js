// config/db.js
import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      // options par défaut suffisantes en mongoose v7+
    });
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB:", err.message);
    process.exit(1);
  }
};