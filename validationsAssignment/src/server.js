const express = require("express")
const app = require("./index")
app.use(express.json())
const connect = require("./configs/db")

const userController = require("./controller/userController")

app.use(express.urlencoded({ extended: true })); 

app.use("/users",userController)

app.listen(2365, async function () {

    await connect();
    console.log("listening on port 2365")
})


