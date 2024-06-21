const express=require("express")

const router=express.Router()

const userSignUpController= require("../controller/userSignUp")
const userSignInController =require("../controller/userSignin")
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/getProduct')
const updateProductController = require('../controller/updateProduct')
const getCategoryProduct = require('../controller/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct')
const getProductDetails = require('../controller/getProductDetails')
const addToCartController = require('../controller/addToCartController')
const addToCartViewProduct  = require('../controller/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct')
const searchProduct = require('../controller/searchProduct')
const filterProductController = require('../controller/filterProduct')
const booking =require('../controller/orderDetails')
const history =require('../controller/orderHistory')
const getOne=require('../controller/getOneProduct')
const updateCount=require('../controller/updateProductCount')
const adminOrders=require('../controller//adminOrder')
const updatestatus =require('../controller/updateStatus')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)

router.post("/addtocart",authToken,addToCartController)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)


router.post("/booking",authToken,booking)
router.get("/historyALL",authToken,history)
router.get("/productdet",getOne)
router.post("/updateCoun",updateCount)
router.get("/adminOrder",adminOrders)
router.post("/updatestatus",authToken,updatestatus)

router.get("/all-user",authToken,allUsers)

module.exports = router