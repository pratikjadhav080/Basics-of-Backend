const express = require("express")

const router = express.Router()

const Student = require("../models/studentModel")

router.post("", async (req, res) => {
    const student = await Student.create(req.body);
    return res.status(201).send({ student });
});

router.get("", async (req, res) => {
    const student = await Student.find().lean().exec();
    return res.status(200).send({ student });
});

router.patch("/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).send({ student });
});

router.delete("/:id", async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ student });
});

router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id).lean().exec();
    return res.status(200).send({ student });
});


module.exports = router;



