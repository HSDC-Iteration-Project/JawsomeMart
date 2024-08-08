const express = require("express");
const router = express.Router();
const {createPrice, checkout} = require('../controllers/checkoutController');

router.post('/', createPrice, checkout, (req, res) => {
    res.status(200);
})


module.exports = router;