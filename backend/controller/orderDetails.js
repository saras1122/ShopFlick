const productModel = require("../models/bookModel")
const addToCartModel = require("../models/cartProduct")
const nodemailer = require("nodemailer");
async function oderDetails(req, res) {
    try {
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        await addToCartModel.deleteMany({});
        //Email Part Implemented
        // const transporter = nodemailer.createTransport({

        //     service: 'gmail',// Use `true` for port 465, `false` for all other ports
        //     auth: {
        //         user: "shichan.nohara254@gmail.com",
        //         pass: "shin@#1234",
        //     },
        // });
        // const info = ({
        //     from: "shichan.nohara254@gmail.com", // sender address
        //     to: "shichan.nohara254@gmail.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });
        // await transporter.sendMail(info, function (err, data) {
        //     if (err) {
        //         console.log('Error Occurs:', err);
        //         res.status(500).json({
        //             message: "Error sending email",
        //             error: true,
        //             success: false,
        //         });
        //     } else {
        //         console.log('Email sent successfully');
        //         res.status(201).json({
        //             message: "Product upload successfully",
        //             error: false,
        //             success: true,
        //             data: saveProduct
        //         });
        //     }
        // });
        // console.log(info.messageId)
        res.status(201).json({
            message: "Product upload successfully",
            error: false,
            success: true,
            data: saveProduct
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = oderDetails