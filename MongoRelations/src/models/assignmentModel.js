
const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        instructor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        student_ids: [
            { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;


