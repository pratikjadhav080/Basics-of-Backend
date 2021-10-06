const nodemailer = require("nodemailer")

require("dotenv").config()

const transpoter = nodemailer.createTransport({
    host: process.env.CURRENT_ENVIRONMENT === "Development" ? "smtp.mailtrap.io" : "",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

module.exports = transpoter