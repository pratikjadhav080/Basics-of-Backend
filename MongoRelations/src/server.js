const express = require("express")

const app = express();

app.use(express.json())

const connect = require("./dbconfigs/db")

const userController = require("./controller/userController")
const studentController = require("./controller/studentController")
const assingmentController = require("./controller/assingmentController")
const submissionController = require("./controller/submissionController")

app.set("view engine",ejs)

app.use("/users",userController)
app.use("/students",studentController)
app.use("/assignments",assingmentController)
app.use("/submissions",submissionController)

app.listen(2346, async function () {

    await connect();
    console.log("listening on port 2346")
})
