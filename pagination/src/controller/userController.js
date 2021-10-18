const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Admin = require("../models/adminModel")
const sendmail = require("../utils/sendMail")

router.post("", async (req, res) => {

    const user = await User.create(req.body);

    const admin = await Admin.find().populate("user_id").lean().exec()

    sendmail({
        from: "sender@server.com",
        to: user.email,
        subject: `Welcome to ABC system - ${user.first_name} ${user.last_name}`,
        text: `Hi ${user.first_name}, Please confirm your email address`,
        html: "<p>HTML version of the message</p>"
    })

    admin.forEach((e) => {
        
        sendmail({
            from: "sender@server.com",
            to: e.user_id.email,
            subject: `${user.first_name} ${user.last_name} has registered with us`,
            text: `Please welcome ${user.first_name} ${user.last_name}`,
            html: "<p>HTML version of the message</p>"
        })
    });

    return res.status(201).send({ user });
});


router.get("", async (req, res) => {

    const page = +req.query.page || 1;
    const size = +req.query.size || 10;

    const offset = (page-1)*size;

    const users = await User.find().skip(offset).limit(size).lean().exec();

    const totalUserCount = await User.find().countDocuments();
    
    const totalPages = Math.ceil(totalUserCount/size)

    return res.render('allUsers.ejs',{ users:users , totalPages:totalPages});
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


