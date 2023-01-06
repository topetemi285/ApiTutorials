const productController = require("../controller/product.controller");
const express = require("express");
const router = express.Router();

router.post("/products", productController.create);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.findOne);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);


module.exports = router