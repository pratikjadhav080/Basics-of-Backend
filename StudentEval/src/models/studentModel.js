
const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    roll_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    current_batch: { type: String, required: true },
    evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true },
    result: { type: Number, required: true }
},{
    versionKey: false,
    timestamps: true
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;