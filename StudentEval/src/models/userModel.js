
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const User = mongoose.model("user", userSchema);

module.exports = User;