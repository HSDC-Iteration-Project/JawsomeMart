const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();
const path = require('path');
const db = require('./config/db.js');
const productsRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const checkoutRoutes = require('./routes/checkoutRoutes.js');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // This is your test secret API key.

db();
app.use(express.static('public'));
app.use(express.json());
app.use('/api/cart', cartRoutes);
// app.use('/api/create-checkout-session', checkoutRoutes);
app.use('/api/auth', userRoutes);
app.use('/api', productsRoutes);

// move to file eventually
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/api/create-checkout-session', async (req, res) => {
  console.log('inside create-checkout-session...');
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PlCRN2eZvKYlo2Cr2XW50h9',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    // res.json({ id: session.id });
    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
