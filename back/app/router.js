const express = require("express");
const router = express.Router();
const listController = require("./controllers/listController.js");
const userController= require ("./controllers/userController.js");

// Inscription
router.post("/register", userController.registerUser);

// connexion
router.post("/login", userController.loginUser);

// accès aux listes ou à une liste particulière
router.get("/lists", listController.getAllLists);
router.get("/list/:id", listController.getListById);

// Création, mise à jour et suppression d'une liste
router.post("/list", listController.createList);
router.patch("/list/:id", listController.updateList);
router.delete("/list/:id", listController.deleteList);


module.exports = router;