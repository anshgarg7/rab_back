const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const nodemailer = require('nodemailer');
const sendgridEmail = require('@sendgrid/mail');
sendgridEmail.setApiKey(config.SendGridApiKey);

const controller = {};

let transporter = nodemailer.createTransport({
    service: config.mailService,
    auth: {
        user: config.mailUser,
        pass: config.mailPass,
    }
});

controller.emailSend = async (to, from, subject, mesg, attachments, callback) => {
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: mesg,
        attachments: attachments,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

controller.sendgridEmailSend = async (to, from, subject, mesg, attachments, callback) => {
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: mesg,
        attachments: attachments,
    };
    await sendgridEmail.send(mailOptions).then((response) => {
        callback(true);
    }).catch((error) => {
        callback(false);
    })
}

module.exports = controller;