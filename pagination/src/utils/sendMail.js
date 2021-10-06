const transpoter = require("../configs/mail")

const sendmail = ({from,to,subject,text,html}) =>{

    const message = {
        from:from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    
    transpoter.sendMail(message)
    
}

module.exports = sendmail

