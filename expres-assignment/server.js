const express = require("express")

const app = express();

const users = require("./express.json")

app.use(express.json())

let d;

app.get("/",middleman({ api_requested_by: "required" }), (req, res) => {

    d.books = users

    res.send(d)

})


app.post("/books", middleman({ api_requested_by: "required" }), (req, res) => {

    users.push(req.body)
    d.books = users
    res.send(d)

})

app.get("/books/:id", middleman({ api_requested_by: "required" }), (req, res) => {

    let id = req.params.id;

    users.forEach((ele) => {
        if (ele.id == id) {
            d.book = ele
            res.send(d)
        }
    })

})


app.patch("/books/:id", middleman({ api_requested_by: "required" }), (req, res) => {

    let id = req.params.id; 

    users.forEach((ele) => {
        if (ele.id == id) {

            Object.keys(req.body).forEach((e) => {
                ele[e] = req.body[e]
            })

            d.book = ele

            res.send(d)
        }
    })

})


app.delete("/books/:id", middleman({ api_requested_by: "required" }), (req, res) => {

    let id = req.params.id;

    for (let i = 0; i < users.length; i++) {

        if (users[i].id == id) {

            users.splice(i, 1);

            d.book = users

            res.send(d)
        }

    }

})


function middleman(data) {
    return function (req, res, next) {
        let errors = [];
        Object.keys(data).forEach(function (item) {
            if (!req.query[item]) {
                errors.push(`Please add ${item} in the form`)
            }
        })
        if (errors.length) {
            res.send(errors);
        }

        d = { "api_requested_by": req.query.api_requested_by }
        next()
    }
}


app.listen(3000, function () {
    console.log("listening on port 3000")
})

