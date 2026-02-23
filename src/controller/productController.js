let slugify = require('slugify')
const productModel = require('../model/productSchema')
const cloudinary = require('cloudinary').v2

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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

        // ✅ CHANGED: Cloudinary already gives you the full URL via item.path
        // No need to manually construct it with SERVER_URL anymore
        const imageFiles = req.files.map((item) => item.path);

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

const DeleteProductController = async (req, res) => {
    try {
        let { id } = req.params
        let findproduct = await productModel.findById(id)

        if (!findproduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const deletePromises = findproduct.image.map((url) => {
            const parts = url.split('/')
            const filenameWithExt = parts[parts.length - 1]
            const publicId = `uploads/${filenameWithExt.split('.')[0]}`
            console.log('Deleting publicId:', publicId)
            return cloudinary.uploader.destroy(publicId)
        })
        await Promise.all(deletePromises)

        await productModel.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: 'product deleted successfully.' })
    } catch (error) {
        console.log('Delete error:', error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

//get single product
const SingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
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

module.exports = { CreateProductController, DeleteProductController, SingleProductController, AllProductController };