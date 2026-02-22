let slugify = require('slugify')
const productModel = require('../model/productSchema')
const path = require('path');
const fs = require('fs');

//create product
const CreateProductController = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        //slug
        const slug = slugify(title, {
            replacement: '-',
            lower: true,
            trim: true
        });

        const imageFiles = req.files.map((item) => {
            return `${process.env.SERVER_URL}/uploads/${item.filename}`;
        });

        const product = new productModel({
            title,
            slug,
            description,
            image: imageFiles,
            price
        });
        await product.save();
        return res.status(200).json({ success: true, message: 'Product created successfully.', data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//delete product
const DeleteProductController = async (req, res) => {
    try {
        let { id } = req.params
        let findproduct = await productModel.findById(id)

        if (!findproduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        //delete productImage from backend
        findproduct.image.forEach(async (url) => {
            let imageurl = url.split('/')
            let filepath = path.join(__dirname, '../../uploads')
            fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
                if (err) {
                    return res.status(404).json({ success: false, message: err.message })
                }
            })
        })

        //delete from db
        await productModel.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: 'product deleted successfully.' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

//get all product
const AllProductController = async (req, res) => {
    try {
        let allproduct = await productModel.find({})

        if (allproduct.length == 0) {
            return res.status(404).json({ success: false, message: 'no product found.' })
        } else {
            return res.status(200).json({ success: true, message: 'fetch all product.', data: allproduct })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { CreateProductController, DeleteProductController, AllProductController };