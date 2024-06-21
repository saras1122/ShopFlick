const productModel = require("../models/bookModel")

const orderHistory = async (req, res) => {
    try {
        const sessionUserId = req.userId
        //console.log("he"+sessionUserId)
        const allProduct = await productModel.find({userId: sessionUserId}).sort({ createdAt: -1 }).populate("productId")
        const groupedProducts = groupProductsByTimestamp(allProduct);

        console.log(groupedProducts);
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

function groupProductsByTimestamp(products) {
    const grouped = {};

    products.forEach(product => {
        // Round the createdAt timestamp to the nearest minute
        const roundedTimestamp = product.createdAt.toISOString().slice(0, 16);

        if (!grouped[roundedTimestamp]) {
            grouped[roundedTimestamp] = [];
        }
        grouped[roundedTimestamp].push(product);
    });

    return grouped;
}

module.exports = orderHistory