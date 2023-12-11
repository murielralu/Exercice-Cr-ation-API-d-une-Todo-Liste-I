const express = require("express"); 

const mainController = require("./mainController");

const router = express.Router();

router.get("/lists", mainController.getAlllists);
router.get("/lists/:id", mainController.geListById);
router.post("/lists", mainController.createList);
router.patch("/lists/:id", mainController.updateList);
router.delete("/lists/:id", mainController.deleteList);


module.exports = router;