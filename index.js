// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

// 🔹 Import des routes
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js"; // (remplace clients.routes.js)
import chapeauxRoutes from "./routes/chapeaux.routes.js";
import commandesRoutes from "./routes/commandes.routes.js";
import categoriesChapeauRoutes from "./routes/categoriesChapeau.routes.js";

// 🔹 Import du middleware d’erreurs
import { errorHandler } from "./middlewares/error.middleware.js";

// 🔹 Chargement des variables d’environnement
dotenv.config();

// 🔹 Création de l’app
const app = express();

// 🔹 Configuration du CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// 🔹 Middlewares globaux
app.use(express.json());
app.use(morgan("dev"));

// 🔹 Connexion à MongoDB
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
await connectDB(MONGO_URI);

// 🔹 Routes principales
console.log("authRoutes:", authRoutes);
app.use("/api/auth", authRoutes);
console.log("usersRoutes:", usersRoutes);
app.use("/api/users", usersRoutes); // ✅ route protégée pour les infos utilisateur
console.log("chapeauxRoutes:", chapeauxRoutes);
app.use("/api/chapeaux", chapeauxRoutes);
console.log("commandesRoutes:", commandesRoutes);
app.use("/api/commandes", commandesRoutes);
console.log("authRoutes:", authRoutes);
app.use("/api/categoriesChapeau", categoriesChapeauRoutes);

// 🔹 Route de test
app.get("/", (req, res) =>
  res.send("✅ API Chapeaux Africains opérationnelle !")
);

// 🔹 Middleware global de gestion des erreurs
console.log("errorHandler:", errorHandler);
app.use(errorHandler);

// 🔹 Démarrage du serveur
app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
);
