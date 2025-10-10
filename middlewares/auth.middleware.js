// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import Client from "../models/client.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Client.findById(payload.id).select("-password");
    if (!user)
      return res.status(401).json({ message: "Utilisateur introuvable" });
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token invalide", error: err.message });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Accès refusé (admin requis)" });
  next();
};
