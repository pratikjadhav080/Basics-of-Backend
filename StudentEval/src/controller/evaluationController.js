const express = require("express")

const router = express.Router()

const Evaluation = require("../models/evaluationModel")

router.post("", async (req, res) => {
    const evaluation = await Evaluation.create(req.body);
    return res.status(201).send(evaluation);
})

router.get("", async (req, res) => {
    const evaluations = await Evaluation.find()
    return res.status(201).send(evaluations);
})

router.get("/:id", async (req, res) => {
    const evaluation = await Evaluation.findById(req.params.id).lean();
    return res.status(200).send(evaluation);
})

module.exports = router;