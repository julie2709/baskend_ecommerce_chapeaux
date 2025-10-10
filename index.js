// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import chapeauxRoutes from "./routes/chapeaux.routes.js";
import commandesRoutes from "./routes/commandes.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

await connectDB(MONGO_URI);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/chapeaux", chapeauxRoutes);
app.use("/api/commandes", commandesRoutes);
app.use("/api/categories", categoriesRoutes);

// healthcheck
app.get("/", (req, res) => res.send("API Chapeaux: OK"));

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
