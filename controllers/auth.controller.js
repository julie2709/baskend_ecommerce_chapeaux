// controllers/auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../models/client.model.js";

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res, next) => {
  try {
    const { nom_client, email, password } = req.body;
    if (!nom_client || !email || !password) return res.status(400).json({ message: "Champs manquants" });
    const exists = await Client.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email déjà utilisé" });
    const salt = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hash = await bcrypt.hash(password, salt);
    const client = new Client({ nom_client, email, password: hash });
    await client.save();
    const token = createToken(client);
    res.status(201).json({ token, user: { id: client._id, nom_client: client.nom_client, email: client.email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Champs manquants" });
    const client = await Client.findOne({ email });
    if (!client) return res.status(401).json({ message: "Identifiants invalides" });
    const match = await bcrypt.compare(password, client.password);
    if (!match) return res.status(401).json({ message: "Identifiants invalides" });
    const token = createToken(client);
    res.json({ token, user: { id: client._id, nom_client: client.nom_client, email: client.email } });
  } catch (err) {
    next(err);
  }
};
