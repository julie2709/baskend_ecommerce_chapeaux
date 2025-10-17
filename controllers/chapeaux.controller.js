// controllers/chapeaux.controller.js

// Liste tous les chapeaux
export const getChapeaux = (req, res) => {
  res.send("Liste des chapeaux");
};

// Crée un nouveau chapeau
export const createChapeau = (req, res) => {
  res.send("Création d'un chapeau");
};
