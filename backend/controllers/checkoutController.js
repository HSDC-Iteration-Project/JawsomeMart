// implement checkout using stripe
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // This is your test secret API key.
const YOUR_DOMAIN = 'http://localhost:3000';

let checkoutController = {};

// create stripe price and product for checkout total
checkoutController.createPrice = async (req, res, next) => {
    try {
        const product = await stripe.products.create({
            name: 'JawesomeMart Goodies',
            description: `Thank you for purchasing ${req.query.numCartItems} of our goodies!`,
          }).then(product => {
            stripe.prices.create({
              unit_amount: req.query.cartTotal * 100,
              currency: 'usd',
              product: product.id
            }).then(price => {
              // pass product and price ids for checkout to use
              res.locals.productId = product.id;
              res.locals.priceId = price.id;
              next();
            });
        });
    } catch(err) {
        return next({
            message: 'error in checkout: ' + err,
            log: err,
          })
        }
};

checkoutController.checkout = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: `${res.locals.priceId}`,
                quantity: 1,
            },
            ],
            mode: 'payment', // specify mode
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cart`,
        });
        res.redirect(303, session.url); // redirects user to stripe hosted payment page
        next();
    } catch(err) {
        return next({
            message: 'error in checkout: ' + err,
            log: err,
          });
    }
};
   
module.exports = checkoutController;