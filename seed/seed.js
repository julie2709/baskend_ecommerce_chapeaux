import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Client from "../models/client.model.js";
import Categorie from "../models/categorie.model.js";
import Chapeau from "../models/chapeau.model.js";

dotenv.config();
await connectDB(process.env.MONGO_URI);

const run = async () => {
  await Client.deleteMany();
  await Categorie.deleteMany();
  await Chapeau.deleteMany();

  const cat1 = await Categorie.create({ nom_categorie: "balade" });
  const cat2 = await Categorie.create({ nom_categorie: "eremonie" });

  const client = await Client.create({
    nom_client: "Admin",
    email: "admin@ex.com",
    password: await require("bcrypt").hash(
      "adminpass",
      parseInt(process.env.SALT_ROUNDS || "10")
    ),
    role: "admin",
  });

  const chapeau = await Chapeau.create({
    nom_chapeau: "Chapeau Panama",
    desc_chapeau: "Beau chapeau",
    prix: 49.99,
    nbre_chapeau: 20,
    categorie: { id_categorie: cat1._id, nom_categorie: cat1.nom_categorie },
  });

  console.log("Seed terminé.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
