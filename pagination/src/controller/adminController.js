const express = require("express")

const router = express.Router()

const Admin = require("../models/adminModel")

router.post("", async (req, res) => {

    const admin = await Admin.create(req.body);

    return res.status(201).send({ admin });
});

router.get("", async (req, res) => {

    const admins = await Admin.find().lean().exec();

    return res.status(200).send({ admins });
});

router.delete("/:id", async (req, res) => {
    const admin = await Admin.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ admin });
});

module.exports = router;


