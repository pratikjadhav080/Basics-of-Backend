const express = require("express")

const router = express.Router()

const Topic = require("../models/topicModel")

router.post("", async (req, res) => {
    const topic = await Topic.create(req.body);
    return res.status(201).send(topic);
})

router.get("", async (req, res) => {
    const topics = await Topic.find().lean();
    return res.status(200).send(topics);
})


router.delete("", async (req, res) => {
    const topics = await Topic.deleteMany();
    return res.status(200).send(topics);
})


module.exports = router;