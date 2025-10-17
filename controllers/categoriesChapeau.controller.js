// controllers/categoriesChapeau.controller.js

// Récupère toutes les catégories
export const getCategories = (req, res) => {
  res.send("Liste des catégories de chapeaux");
};

// Crée une nouvelle catégorie
export const createCategory = (req, res) => {
  res.send("Création d'une catégorie de chapeaux");
};
