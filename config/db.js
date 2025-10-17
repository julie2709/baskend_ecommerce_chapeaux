// config/db.js
// config/db.js
import mongoose from "mongoose";

/**
 * Connexion à MongoDB
 * @param {string} uri - L'URL de connexion MongoDB
 */
export const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`📡 MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    process.exit(1); // Stoppe le serveur si la connexion échoue
  }
};
