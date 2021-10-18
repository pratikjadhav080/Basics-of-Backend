const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const Product = require("../models/product.model");

const upload = require("../middlewares/fileupload");

router.post("/single", upload.single("productImages"), async (req, res) => {
    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: req.file.path
    })
    res.send(product);
})

router.post("/multiple",upload.any("productImages"), async (req, res) => {
    const filePaths = req.files.map(file => file.path);
    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: filePaths
    })
    res.send(product);
})

module.exports = router;