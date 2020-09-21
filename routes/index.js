const router = require("express").Router();
const productRoutes = require("./productRoutes");

router.use("/products", productRoutes);

module.exports = router;
