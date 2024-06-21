const productModel = require("../models/productModel")
const { MongoClient, ObjectId } = require("mongodb");
const getOneProduct =async(req,res)=>{
    try {
        const { productId } =  req.query
        //console.log(productId)
        const product = await productModel.findById(productId);
        //console.log(product)
        
        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: product
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getOneProduct