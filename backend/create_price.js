// test file for stripe api implementation 
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1500,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});

// test file for pulling products from fakestoreapi
// fetch('https://fakestoreapi.com/products?limit=50')
//             .then(res=>res.json())
//             .then(json=>console.log(json))