import express from "express";
import { getCommandes, createCommande } from "../controllers/commandes.controller.js";

const router = express.Router();

router.get("/", getCommandes);
router.post("/", createCommande);

export default router; // ✅ export par défaut
