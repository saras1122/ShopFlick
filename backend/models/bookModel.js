const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
   },
   productName:String,
   quantity : Number,
   userId : String,
   status:String,
   name:String,
   email:String,
   city:String,
   mnumber:Number,
   pincode:Number,
   address:String,
},{
    timestamps: true
})

const bookModel = mongoose.model("book", bookSchema)


module.exports = bookModel