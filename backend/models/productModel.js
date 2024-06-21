const mongoose = require("mongoose");
const { ObjectId } =require("mongodb");

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    currentQuantity: Number,
},{
    timestamps: true
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel