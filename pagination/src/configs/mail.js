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
    pool: true, // use pooled connection
    rateLimit: true, // enable to make sure we are limiting
    maxConnections: 1, // set limit to 1 connection only
    maxMessages: 3, // send 3 emails per second
});

module.exports = transpoter