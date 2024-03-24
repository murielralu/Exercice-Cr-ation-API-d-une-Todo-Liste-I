const express = require("express");
const router = express.Router();
const mainController = require("./mainController.js");

// Inscription
router.post("/register", mainController.registerUser);

// connexion
router.post("/login", mainController.loginUser);

// accès aux listes ou à une liste particulière
router.get("/lists", mainController.getAllLists);
router.get("/list/:id", mainController.getListById);
router.post("/list", mainController.createList);
router.patch("/list/:id", mainController.updateList);
router.delete("/list/:id", mainController.deleteList);


module.exports = router;