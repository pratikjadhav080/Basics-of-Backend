const express = require("express")

const router = express.Router()

const Student = require("../models/studentModel")


router.post("", async (req, res) => {
    const student = await Student.create(req.body);
    return res.status(201).send(student);
})

router.get("", async (req, res) => {
    const students = await Student.find();
    return res.status(201).send(students);
})

router.get("/:evaluation_id", async (req, res) => {
    const student = await Student.find({"evaluation":req.params.evaluation_id}).lean();
    return res.status(200).send(student);
})

router.get("/highestMarks/:evaluation_id", async (req, res) => {

    //flter thru all students having samae evaluation id 

    const student = await Student.find({"evaluation":req.params.evaluation_id}).sort({result: -1}).populate("roll_id").lean().exec();

    return res.status(200).send(student[0]);
})


module.exports = router;