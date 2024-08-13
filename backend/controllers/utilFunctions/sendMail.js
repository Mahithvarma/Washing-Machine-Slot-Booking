const nodemailer = require('nodemailer');
require("dotenv").config();

const sendMail = async (toEmail, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 578,
        secure: false,  
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_APP_PASSWORD,
        }
    });

    const mailOptions = {
        from:{
            name: "Washing Machine MM Boys",
            address: process.env.ADMIN_EMAIL,
        },
        to: [`${toEmail}`],
        subject: "OTP verification for password Reset 🔑",
        html: `<p>This is your OTP to reset your password: <b>${otp}</b></p>`,
    };

    try{
        await transporter.sendMail(mailOptions);
        return true;
    }
    catch(err){
        console.log("Error in sending email: ", err);
        return false;
    }
};

module.exports = {sendMail};