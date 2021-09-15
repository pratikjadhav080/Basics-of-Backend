console.log("Pratik")

const express = require("express")

//mockoroo.com

const users = require("./express.json")
const app = express();

app.use(express.json())

app.get("/",function(req,res){
    res.send("Hello")
})


app.get("/users",function(req,res){
    res.send(users)
})

app.post("/users", validate({lastName:"required",Name:"required",gender:"required"}),function(req,res){
    console.log("Hello")
    console.log(req.body)
    res.send(req.body)
})

// function validate(data){
//     return function logger1(req,res,next){
//         console.log("inside logger1")

//         Object.keys(data).forEach(function(item){

//             if(data[item]==="required"){
//                 if(!req.query[item]){
//                     res.send(`Need ${item}`)
//                 }
    
//             }
//         })

//         next()
//     }

// }


function validate(data) {
    return function(req, res, next) {

        console.log("inside logger1")
        
        let errors = [];
        Object.keys(data).forEach(function (item) {
            if(data[item] === "required") {
                if(! req.query[item]) { // req.query.firstName
                    errors.push(`Please add ${item} in the form`)
                }
            }
        })
        if(errors.length) {
            return res.send(errors);
        }
        next()
    }
}


app.listen(2345, function (){
    console.log("listening to 2345")
})



