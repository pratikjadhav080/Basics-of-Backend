const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
},{
    versionKey:false,
    timestamps:true
})

const Admin = mongoose.model("admin",adminSchema); 

module.exports = Admin;