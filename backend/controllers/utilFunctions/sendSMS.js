require("dotenv").config();

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_ACC_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSMS = async (mobile, otp) => {
    let msgOptions = {
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${mobile}`,
        body: `Hello - ${otp} is your OTP to reset your Password`
    }
    try {
        await client.messages.create(msgOptions);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { sendSMS };