const express = require("express");
const router = express.Router();
const mainController = require("./mainController.js");



router.get("/lists", mainController.getAllLists);
router.get("/list/:id", mainController.getListById);
router.post("/list", mainController.createList);
router.patch("/list/:id", mainController.updateList);
router.delete("/list/:id", mainController.deleteList);


module.exports = router;