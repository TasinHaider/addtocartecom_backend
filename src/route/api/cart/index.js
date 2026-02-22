const express = require('express')
const router = express.Router()
const { AddToCartController, AllCartController, DeleteUserCartController } = require('../../../controller/cartController')

//create,get
router.post('/addtocart', AddToCartController)
router.get('/allcart', AllCartController)
router.delete('/deletecart/:id', DeleteUserCartController)

module.exports = router;