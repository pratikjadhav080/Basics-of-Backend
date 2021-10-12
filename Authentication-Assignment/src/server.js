const app = require("./index")
const connect = require("./configs/db")

app.listen(4444, async function () {
    await connect();
    console.log("listening on port 4444");
})