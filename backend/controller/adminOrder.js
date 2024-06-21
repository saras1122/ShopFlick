const productModel = require("../models/bookModel")

const adminOrder = async (req, res) => {
    try {
        const sessionUserId = req.userId
        //console.log("he"+sessionUserId)
        const allProduct = await productModel.find().sort({ createdAt: -1 }).populate("productId")
        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: allProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports=adminOrder