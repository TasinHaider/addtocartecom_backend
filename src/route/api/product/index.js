const express = require('express');
const router = express.Router();
const { CreateProductController, DeleteProductController, SingleProductController, AllProductController } = require('../../../controller/productController')
const upload = require('../../../utils/multerUpload')

//product routes
router.post('/createproduct', upload.array('images', 5), CreateProductController)
router.delete('/deleteproduct/:id', DeleteProductController)
router.get('/allproduct', AllProductController)
router.get('/:slug', SingleProductController)

module.exports = router;