const express = require("express")

const router = express.Router()

const User = require("../models/userModel")


router.post("", async (req, res) => {
    const user = await User.create(req.body);
    return res.status(201).send({ user });
});

router.get("", async (req, res) => {
    const user = await User.find().lean().exec();
    return res.status(200).send({ user });
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();
    return res.status(200).send({ user });
});

router.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).send({ user });
});

router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ user });
});


module.exports = router;


