const express = require("express")

const router = express.Router()

const Submission = require("../models/submissionModel")

router.post("", async (req, res) => {
    const submission = await Submission.create(req.body);
    return res.status(201).send({ submission });
});

// .populate({ path: 'student_id', select: 'name' })

router.get("", async (req, res) => {
    const submission = await Submission.find()
        .populate("student_id")
        .lean()
        .exec();
    return res.status(200).send({ submission });
});

router.get("/:id", async (req, res) => {
    const submission = await Submission.findById(req.params.id).lean().exec();
    return res.status(200).send({ submission });
});

router.patch("/:id", async (req, res) => {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).send({ submission });
});

router.delete("/:id", async (req, res) => {
    const submission = await Submission.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ submission });
});


module.exports = router;




