const express = require("express")

const mongoose = require("mongoose")

const app = express();

app.use(express.json())

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/assingment")
}


//create a schema

const movieSchema = new mongoose.Schema({
    id:{type:Number, required:true},
    movie_name:{type:String, required:true},
    movie_genre:{type:String, required:true},
    production_year:{type:Number,required:true},
    budget:{type:Number,required:true},
})

//connect the schema to the movies collection

const Movie = mongoose.model("movie",movieSchema);  //automatically make movie to movies


//create a movie

app.post("/movies", async (req,res)=>{


    const movie = await Movie.create(req.body)  //same as db.movies.insert()

    return res.status(201).send({movie})
})

//get all movies in db

app.get("/movies", async (req,res)=>{


    const movies = await Movie.find().sort({"id":-1}).lean().exec()  //same as db.movies.insert()

    return res.status(200).send({movies})
})

//lean() - converts mongoose object to the json object
//exec() - returns the entire promise 


//get single movie in db

app.get("/movies/:id", async (req,res)=>{


    const movie = await Movie.find({"id":req.params.id})  

    return res.status(200).send({movie})
})


//update a single movie in db

app.patch("/movies/:id", async (req,res)=>{


    const movie = await Movie.findByIdAndUpdate(req.params.id,req.body, {new:true})  

    return res.status(200).send({movie})
})


//delete a single movie in db

app.delete("/movies/:id", async (req,res)=>{


    const movie = await Movie.findByIdAndDelete(req.params.id)  

    return res.status(200).send({movie})
})




app.listen(2345, async function () {

    await connect();
    console.log("listening on port 2345")
})
