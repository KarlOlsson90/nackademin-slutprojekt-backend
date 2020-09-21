const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);

module.exports = router;
