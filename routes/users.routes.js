// routes/users.routes.js
import express from "express";
// Ici, protect est placé avant le controller.

// Si le JWT est invalide ou absent, la route n’est pas exécutée.
import { protect } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/users.controller.js";

const router = express.Router();

// GET /api/users/me => récupère le profil connecté
router.get("/me", protect, getUserProfile);

export default router;