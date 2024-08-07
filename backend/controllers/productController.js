const Product = require('../models/productModel.js');

let productController = {};

productController.getProducts = async (req, res, next) => {
  try {
    console.log("req.params", req.params)
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    return next({
      message: 'error in getProducts: ' + err,
      log: err,
    });
  }
};

productController.getCategory = async (req, res, next) => {
  try {
    console.log("req.params", req.params.category)
    const products = await Product.find({category: req.params.category});
    res.json(products);
  } catch (err) {
    return next({
      message: 'error in getProducts: ' + err,
      log: err,
    });
  }
};

module.exports = productController;
