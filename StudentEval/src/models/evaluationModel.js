
const mongoose = require("mongoose")

const evaluationSchema = new mongoose.Schema({
    date_of_evaluation: { type: String, required: true },
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "topic", required: true }],
},{
    versionKey: false,
    timestamps: true
})

const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = Evaluation;