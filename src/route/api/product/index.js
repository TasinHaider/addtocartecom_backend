const express = require('express');
const router = express.Router();
const { CreateProductController, DeleteProductController, AllProductController } = require('../../../controller/productController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.post('/createproduct', upload.array('images', 5), CreateProductController)
router.delete('/deleteproduct/:id', DeleteProductController)
router.get('/allproduct', AllProductController)

module.exports = router;