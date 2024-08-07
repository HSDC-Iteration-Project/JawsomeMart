const express = require("express");
const router = express.Router();
const {getProducts, getCategory} = require('../controllers/productController');

router.get('/products', getProducts,(req,res)=>{

res.json(res.locals.allProducts)

})

router.get('/products/:category', getCategory, (req, res)=>{
    res.json(res.locals);
})


module.exports = router;