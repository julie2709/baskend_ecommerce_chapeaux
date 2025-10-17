// controllers/chapeaux.controller.js

// Liste tous les chapeaux
export const getCommandes = (req, res) => {
  res.send("Liste des chapeaux");
};

// Crée un nouveau chapeau
export const createCommande = (req, res) => {
  res.send("Création d'un chapeau");
};