const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    
    if (productIndex === -1) {
        cart.products.push({ productId, quantity: 1 });
    } else {
        cart.products[productIndex].quantity += 1;
    }

    await cart.save();
    res.status(200).send('Product added to cart');
};
