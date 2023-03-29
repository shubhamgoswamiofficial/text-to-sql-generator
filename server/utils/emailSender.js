const nodemailer = require("nodemailer");
let CSV_CONVERTER = require('json-2-csv');
const fs = require('fs');
const path = require('path');


// Name	Lexie Schmitt
// Username	lexie22@ethereal.email (also works as a real inbound email address)
// Password	TpnPWBrK8zqx6BYfB7

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({ records }) {

    const csv = await CSV_CONVERTER.json2csv(records);
    fs.writeFileSync('./coding_ninja.xlsx', csv)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        // host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_USERNAME, // generated ethereal user
            pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
        },
    });

    // // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Shubham" <shubham.goswami@kellton.com>', // sender address
        to: "shubham.goswami@kellton.com", // list of receivers
        subject: "Code Ninja", // Subject line
        text: "Code Ninja Report", // plain text body
        html: `<b>Code Ninja Report</b>`, // html body
        attachments: [
            {
                filename: 'coding_ninja.xlsx',
                path: 'coding_ninja.xlsx'
            }
        ]
    });

    console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


    return { PreviewURL: nodemailer.getTestMessageUrl(info) }
}

module.exports = { sendEmail }