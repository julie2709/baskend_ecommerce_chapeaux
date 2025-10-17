// routes/auth.routes.js
import express from "express";
import { register, login } from "../controllers/auth.controller.js";
const router = express.Router();

// POST /api/auth/register => appellle registerUser ou register dans notre cas
router.post("/register", register);

//POST /api/auth/login => appelle loginUser ou login dans notre cas
router.post("/login", login);

export default router;
