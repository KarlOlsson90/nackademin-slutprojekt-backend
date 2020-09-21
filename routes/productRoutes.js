const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/", productController.create);

router.get("/", productController.getAll);
router.get("/:id", productController.get);

router.patch("/:id", productController.update);

router.delete("/:id", productController.delete);
router.delete("/", productController.deleteAll);

module.exports = router;
