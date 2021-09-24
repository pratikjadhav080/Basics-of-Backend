const express = require("express")

const app = express();

app.use(express.json())

const connect = require("./dbconfig/db")

const userController = require("./controller/userController")
const studentController = require("./controller/studentController")
const topicController = require("./controller/topicController")
const evaluationController = require("./controller/evaluationController")

app.use("/users",userController)
app.use("/students",studentController)
app.use("/topics",topicController)
app.use("/evaluations",evaluationController)


app.listen(2350, async function () {

    await connect();
    console.log("listening on port 2350")
})




