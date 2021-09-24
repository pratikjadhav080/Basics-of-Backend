const express = require("express")

const router = express.Router()

const User = require("../models/userModel")


router.post("", async (req, res) => {
    const user = await User.create(req.body)
    return res.status(201).send({ user })
})

router.get("", async (req, res) => {
    const users = await User.find().lean()
    return res.status(200).send({ users })
})

module.exports = router;