console.log("Pratik")

const express = require("express")


const users = require("./express.json")
const app = express();

app.get("/",function(req,res){
    res.send("Hello")
})


app.get("/users",function(req,res){
    res.send(users)
})

app.listen(2345, function (){
    console.log("listening to 2345")
})