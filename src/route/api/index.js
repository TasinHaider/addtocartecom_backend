const express = require('express');
const router = express.Router();
const productControllerAPI = require('./product/index')
const authAPI = require('./auth/index')

router.use('/auth', authAPI)
router.use('/product', productControllerAPI)

module.exports = router;