const Product = require("../models/productModels");

module.exports = {
  create: async (req, res) => {
    try {
      const product = await Product.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
