// implement checkout using stripe
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // This is your test secret API key.
const YOUR_DOMAIN = 'http://localhost:3000';

let checkoutController = {};
checkoutController.checkout = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1PlCRN2eZvKYlo2Cr2XW50h9',
                quantity: 1,
            },
            ],
            mode: 'subscription', // specify mode
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