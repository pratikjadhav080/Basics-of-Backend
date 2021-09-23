const express = require("express")

const router = express.Router()

const Assignment = require("../models/assignmentModel")

router.post("", async (req, res) => {
    const assignment = await Assignment.create(req.body);
    return res.status(201).send({ assignment });
});

router.get("", async (req, res) => {
    const assignment = await Assignment.find().lean().exec();
    return res.status(200).send({ assignment });
});

router.get("/:id", async (req, res) => {
    const assignment = await Assignment.findById(req.params.id).lean().exec();
    return res.status(200).send({ assignment });
});


router.patch("/:id", async (req, res) => {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).send({ assignment });
});

router.delete("/:id", async (req, res) => {
    const assignment = await Assignment.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ assignment });
});


module.exports = router;





