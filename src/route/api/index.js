const express = require('express');
const router = express.Router();
const productControllerAPI = require('./product/index')
const authAPI = require('./auth/index')
const cartAPI = require('./cart/index')

//routes
router.use('/auth', authAPI)
router.use('/product', productControllerAPI)
router.use('/cart', cartAPI)

module.exports = router;