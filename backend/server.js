var express = require('express');
var app = express();
const port = 8080;
require('dotenv').config();
const path = require('path');
const db = require('./config/db.js');
const productsRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const checkoutRoutes = require('./routes/checkoutRoutes.js');
var cors = require('cors');

const fetch = (...args) => 
  import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser')

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // This is your test secret API key.

const CLIENT_SECRET =  "479870b0551c3ec3246d7acdf871a12beeb5e167";
const CLIENT_ID = "Ov23liWbQ8kufW9ONo0S";

db();
app.use(express.static('public'));
app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',  // Replace with your client origin if different
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
  console.log(req.query.code);

   const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
  
   await fetch("https://github.com/login/oauth/access_token" + params, {
     method: "POST",
     headers: {
       "Accept": "application/json"
     }
   }).then((response) => {
     return response.json();
   }).then((data) => {
     console.log(data);
     res.json(data);
   })
 })

// app.get('/getAccessToken', async function (req, res) {
//   const code = req.query.code;

//   const params = new URLSearchParams({
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     code: code
//   }).toString();

//   try {
//     const response = await fetch('https://github.com/login/oauth/access_token', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: params
//     });

//     if (!response.ok) {
//       const errorResponse = await response.text();
//       console.error('GitHub API error:', errorResponse);
//       throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log('GitHub access token response:', data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get('/getUserData', async function(req, res) {

  req.get("Authorization");

    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        // 'Authorization': authHeader,
        "Authorization": req.get("Authorization")
        // 'Accept': 'application/json',
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      res.json
    })
});

app.use('/api/cart', cartRoutes);
// app.use('/api/create-checkout-session', checkoutRoutes);
app.use('/api/auth', userRoutes);
app.use('/api', productsRoutes);

// move to file eventually 
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/api/create-checkout-session', async (req, res) => {
  console.log('inside create-checkout-session...')
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
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
