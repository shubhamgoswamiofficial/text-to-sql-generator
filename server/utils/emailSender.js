const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({data}) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport

    //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
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            // user: 'thad.nolan@ethereal.email',
            // pass: 'WvqjeJRkHvzt2M4EZt'
            'user': 'apikey', // <--- keep as is
            pass:''
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Shubham" <shubham.goswami@kellton.com>', // sender address
        to: "shubhgo93@gmail.com", // list of receivers
        subject: "Code Ninja", // Subject line
        text: "Test Text", // plain text body
        html: `<b>${data}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return "Message sent: %s", info.messageId
}

module.exports = { sendEmail }