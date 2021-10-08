const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require('express-validator');

router.post("/",
    body("first_name").notEmpty().withMessage("First Name is required"),
    body("last_name").notEmpty().withMessage("Last Name is required"),
    body("email").custom((value) => {

        if (!value) {
            throw new Error("EMAIL is required");
        }

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(value)) {
            throw new Error("Invaild Email Id");
        }

        return true;
    }),
    body("pincode").custom((value) => {
        if (!value) {
            throw new Error("PINCODE is required");
        }
        value = value.toString();
        if (value.length !== 6) {
            throw new Error("PINCODE length has to be exactly 6 numbers");
        }
        return true;
    }),
    body("age").custom((value) => {
        if (!value) {
            throw new Error("AGE is required");
        }

        if (+value < 1 || +value > 100) {
            throw new Error('AGE should be between 1 and 100.');
        }
        return true;
    }),
    body("gender").custom((value) => {
        if (!value) {
            throw new Error("GENDER is required");
        }
        if (value !== "Male" && value !== "Female" && value !== "Others") {
            throw new Error('GENDER should be either Male, Female or Others');
        }
        return true;
    }),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const finalErrors = errors.array().map(e => {
                return {
                    message: e.msg,
                    param: e.param
                }
            })
            return res.status(400).send({ err: finalErrors })
        }

        const user = await User.create(req.body)

        return res.status(201).json({ user })
    })

module.exports = router;