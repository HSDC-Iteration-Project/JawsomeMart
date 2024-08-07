// implement checkout using stripe
const stripe = require('stripe')('sk_test_51Pkveg00Acuha2WoeGVdUASIrgy47JMZd0QcPJfUmistliQsw5NqqJOIVUc6VKnLoOHHgyFHzotazYMNGoO6aSU700AJgq0pfX'); // This is your test secret API key.
const YOUR_DOMAIN = 'http://localhost:8080';

let checkoutController = {};
console.log('inside checkout controller...')
checkoutController.checkout = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '3000',
                quantity: 1,
            },
            ],
            mode: 'payment', // specify mode
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        
        res.redirect(303, session.url);
        next();
    } catch(err) {
        return next({
            message: 'error in checkout: ' + err,
            log: err,
          });
    }
};
   
module.exports = checkoutController;