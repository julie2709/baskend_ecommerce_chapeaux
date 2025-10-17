import express from "express";
import { getChapeaux, createChapeau } from "../controllers/chapeaux.controller.js";

const router = express.Router();

router.get("/", getChapeaux);
router.post("/", createChapeau);

export default router;
