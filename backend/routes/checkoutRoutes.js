const express = require("express");
const router = express.Router();
const {checkout} = require('../controllers/checkoutController');

router.post('/', checkout, (req, res) => {
    res.status(200);
})


module.exports = router;