// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

/**
 * Middleware pour protéger les routes (JWT)
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Utilisateur introuvable ou supprimé");
      }

      next();
    } catch (error) {
      console.error("Erreur de vérification du token :", error.message);
      res.status(401);
      throw new Error("Non autorisé : token invalide ou expiré");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Non autorisé : aucun token fourni");
  }
});

/**
 * Middleware pour autoriser uniquement les admins
 */
export const admin = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Non authentifié");
  }

  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Accès refusé : administrateur requis");
  }

  next();
};
