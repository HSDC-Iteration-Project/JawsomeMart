const Cart = require('../models/cartModel.js');

const cartController = {};

cartController.createCart = async (req, res, next) => {
  try {
    const userId = res.locals.data.user.id;
    const cart = await Cart.create({ user_id: userId, products: [] });
    // return res.json(cart);
    return next();
  } catch (err) {
    return next({
      message: 'error in createCart: ' + err,
      log: err,
    });
  }
};
//66b0f72b14fdaeafe0b10927
cartController.addCart = async (req, res, next) => {
  console.log('id of the user: ', req.body);
  try {
    const userId = req.user.id;
    const productId = req.body.id;
    const cartExists = await Cart.findOne({ user_id: userId });
    console.log('cartExists: ', cartExists);
    cartExists.products.push(productId);
    await cartExists.save();
    res.json(cartExists);
  } catch (err) {
    // console.log('error in addCart: ', err);
    return next({
      log: `Error in addCart middleware: ${err}`,
      status: 400,
      message: 'error in addCart: ' + err,
    });
  }
};

cartController.getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user_id: userId }).populate('products');
    return res.json(cart);
  } catch (err) {
    return next({
      log: `Error in the getCart middleware: ${err}`,
      status: 500,
      message: 'error in getCart: ' + err,
    });
  }
};

cartController.orderCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartExists = await Cart.findOne({ user_id: userId });
    if (cartExists) {
      cartExists.products = [];
      await cartExists.save();
    }
    return res.json(cartExists);
  } catch (err) {
    return next({
      message: 'error in orderCart: ' + err,
      log: err,
    });
  }
};

cartController.removeItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // update cart --> removing item because we're assigning req.body to be equal to cart without the elements we want and updating DB
    const cartExists = await Cart.findOneAndUpdate(
      { user_id: userId },
      { products: req.body }
    );

    if (cartExists) {
      await cartExists.save();
    }
    return res.json(cartExists);
  } catch (err) {
    return next({
      message: 'error in createCart: ' + err,
      log: err,
    });
  }
};

module.exports = cartController;

// cartController.createCart = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { products } = req.body;

//     const cartExists = await Cart.findOne({ user_id: userId });

//     if (cartExists) {
//       cartExists.products = products;
//       await cartExists.save();
//     } else {
//       const cart = await Cart.create({ user_id: userId, products: [] });
//       return res.json(cart);
//     }
//     return res.json(cartExists);
//   } catch (err) {
//     return next({
//       message: 'error in createCart: ' + err,
//       log: err,
//     });
//   }
// };
