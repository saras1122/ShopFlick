const addToCartModel = require("../models/productModel")

const updateProductCount = async (req, res) => {
    try {
        const addToCartProductId = req?.body?._id
        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { currentQuantity: qty })
        })


        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports = updateProductCount