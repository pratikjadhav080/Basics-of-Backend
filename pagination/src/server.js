const express = require("express")

const app = require("./index")

app.use(express.json())

const connect = require("./configs/db")

const userController = require("./controller/userController")
const adminController = require("./controller/adminController")

app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true })); 

app.get("/landingpage", function (req, res) {
    res.render("userCreation.ejs", {});
  });

app.use("/users",userController)
app.use("/admins",adminController)

app.listen(2364, async function () {

    await connect();
    console.log("listening on port 2364")
})

