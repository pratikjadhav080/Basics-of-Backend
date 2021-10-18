const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: String, required: true},
    image_urls: [{type: String, required: true}]
})

module.exports = mongoose.model("product", productSchema)