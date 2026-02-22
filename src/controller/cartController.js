const cartModel = require("../model/cartSchema")
const productModel = require("../model/productSchema");

// create
const AddToCartController = async (req, res) => {
    try {
        const { user, product, quantity = 1 } = req.body

        let existCart = await cartModel.findOne({ user, product })
        if (existCart) {
            existCart.quantity += 1; 
            await existCart.save()
            return res.status(200).json({ success: true, message: 'Cart quantity updated.', data: existCart })
        }

        if (!product) {
            return res.status(400).json({ success: false, message: 'Product is required.' })
        }

        const productInfo = await productModel.findById(product)
        if (!productInfo) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }

        // calculate price
        const price = productInfo.price * quantity

        const cart = new cartModel({
            user,
            product,
            quantity,
            price
        })
        await cart.save()
        return res.status(201).json({ success: true, message: 'Product added to cart.', data: cart })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get
const AllCartController = async (req, res) => {
    try {
        const { user } = req.query  // 👈 filter by user

        if (!user) {
            return res.status(400).json({ success: false, message: 'User is required.' })
        }

        const allcart = await cartModel.find({ user })
            .populate('product', 'title price image')

        if (allcart.length === 0) {
            return res.status(404).json({ success: false, message: 'No cart found.' })
        }

        return res.status(200).json({ success: true, message: 'Cart fetched successfully.', data: allcart })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// delete
const DeleteUserCartController = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await cartModel.findByIdAndDelete(id)
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found.' })
        }

        return res.status(200).json({ success: true, message: 'Cart deleted successfully.' })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { AddToCartController, AllCartController, DeleteUserCartController }