const express = require("express");
const app = express();
const productController = require("./controllers/product.controller");

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs");

app.get("/products/single", (req, res) => {
    res.render("index")
})

app.use("/products", productController);
module.exports = app;