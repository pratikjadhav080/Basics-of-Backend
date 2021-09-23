const express = require("express")

const mongoose = require("mongoose")

const app = express();

app.use(express.json())

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/relation")
}


//create a schema for a USER

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true
})


//crud for user

const User = mongoose.model("user", userSchema);

app.post("/users", async (req, res) => {
    const user = await User.create(req.body)
    return res.status(201).send({ user })
})

app.get("/users", async (req, res) => {
    const users = await User.find().lean()
    return res.status(200).send({ users })
})

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean()
    return res.status(200).send({ user })
})



//create a schema for book - name,body, author_id, section_id

const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "author", required: true }],
    section_id: { type: mongoose.Schema.Types.ObjectId, ref: "section", required: true }
})

const Books = mongoose.model("book", booksSchema);


//crud for books

app.post("/books", async (req, res) => {
    const book = await Books.create(req.body);
    return res.status(201).send(book);
})

//all books written by an author
app.get("/books/:author_id", async (req, res) => {
    const books = await Books.find({ 
        authors: [{_id: req.params.author_id}]
    })

    return res.status(200).send(books);
})

//find books in a section
app.post("/books/section", async (req, res) => {
    const books = await Books.find({ 
        section_id: req.body.section_id
    })

    return res.status(200).send(books);
})


//find books of 1 author inside a section
app.get("/books/:section_id/:author_id", async (req, res) => {
    const books = await Books.find({ 
        section_id: {_id: req.params.section_id}, 
        authors: [{_id: req.params.author_id}]})

    return res.status(200).send(books);
})

app.get("/books/:id", async (req, res) => {
    const book = await Books.findById(req.params.id).lean().exec();
    return res.status(200).send(book);
})

app.get("/books", async (req, res) => {
    const books = await Books.find().populate("section_id").populate("authors").lean().exec();
    return res.status(201).send(books);
})



//create a schema for author 

const authorsSchema = new mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" ,required: true }
})

const Authors = mongoose.model("author", authorsSchema);


//crud for author

app.post("/authors", async (req, res) => {
    const author = await Authors.create(req.body);
    return res.status(201).send(author);
})

app.get("/authors/:id", async (req, res) => {
    const author = await Authors.findById(req.params.id).lean();
    return res.status(200).send(author);
})

app.get("/authors", async (req, res) => {
    const authors = await Authors.find().populate("author_id").lean();
    return res.status(201).send(authors);
})


//create a schema for section 

const sectionSchema = new mongoose.Schema({
    section_name: { type: String, required: true }
},{
    versionKey:false,
    timestamps:true
})

const Sections = mongoose.model("section", sectionSchema);

//crud for section

app.post("/sections", async (req, res) => {
    const section = await Sections.create(req.body);
    return res.status(201).send(section);
})

app.get("/sections/:id", async (req, res) => {
    const section = await Sections.findById(req.params.id).lean();
    return res.status(200).send(section);
})

app.get("/sections", async (req, res) => {
    const sections = await Sections.find().lean();
    return res.status(200).send(sections);
})

///checkedout schema

const checkoutSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
}, {
    versionKey: false,
    timestamps: true
})

const Checkout = mongoose.model("checkout", checkoutSchema);

//checkout schema

app.post("/checkouts", async (req, res) => {
    const checkout = await Checkout.create(req.body);
    return res.status(201).send({ checkout });
})


//books that are checked out
app.get("/checkouts", async (req, res) => {
    const checkouts = await Checkout.find().populate("book_id").populate("user_id").lean().exec();
    return res.status(200).send({ checkouts })
})

//books in a section that are not checked out
app.get("/checkouts/:section_id", async (req, res) => {
    const checkout = await Checkout.find({});
    const books = await Books.find({ 
        section_id: req.params.section_id
    })

    const arr = [];
    for ({book_id} of checkout) {
        arr.push(book_id)
    }
    
    const newBooks = [];

    for (let i = 0; i < books.length; i++) {
        let flag = false;
        for (let j = 0; j < arr.length; j++) {
            if (books[i]["_id"].equals(arr[j])) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            newBooks.push(books[i]);
        }
    }

    return res.status(200).send(newBooks)
})


app.listen(2347, async function () {

    await connect();
    console.log("listening on port 2347")
})




