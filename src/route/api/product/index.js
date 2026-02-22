const express = require('express');
const router = express.Router();
const { CreateProductController, DeleteProductController, SingleProductController, AllProductController } = require('../../../controller/productController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

//product routes
router.post('/createproduct', upload.array('images', 5), CreateProductController)
router.delete('/deleteproduct/:id', DeleteProductController)
router.get('/allproduct', AllProductController)
router.get('/:slug', SingleProductController)

module.exports = router;