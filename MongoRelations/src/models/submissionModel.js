const mongoose = require("mongoose")

const submissionSchema = new mongoose.Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: "student", required: true},
    status:{type:String, required:true},
},{
    versionKey:false,
    timestamps:true
})

const Submission = mongoose.model("submission",submissionSchema); 

module.exports = Submission;
