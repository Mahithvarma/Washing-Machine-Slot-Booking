const {sendMail} = require('./utilFunctions/sendMail.js');
const { sendSMS } = require('./utilFunctions/sendSMS.js');
const Otp = require("../models/otpModel.js");
const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs");

const SendOTP = async (req, res, next) => {
    try{
        const { emailOrMobile } = req.body;
        const user = await User.findOne({
            $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
        });

        if(!user){
            return res.status(404).json({message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const emailOTP = await sendMail(user.email, otp);
        // const smsOtp = await sendSMS(user.mobile, otp);
        if(emailOTP){

            await Otp.deleteMany({id: user._id});

            const newOtp = await Otp.create({
                id: user._id.toString(),
                otp: hashedOtp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 5 * 60 * 1000
            });

            return res.status(200).json({id: newOtp.id, message: "OTP sent successfully!"});
        }
        
        return res.status(500).json({message: "Failed to send the OTP! "});

    }
    catch(err){
        next(err);
    }
};

const VerifyOTP = async (req, res, next) => {
    try{
        const { id, otp } = req.body;
        const OtpObj = await Otp.findOne({
            id: id
        });

        if(!OtpObj){
            return res.status(404).json({message: "Otp is not generated!" });
        }

        if(OtpObj.expiresAt <= Date.now()){
            await Otp.deleteMany({id: id});
            return res.status(400).json({message: "OTP expired! please resend the OTP."})
        }


        if(await bcrypt.compare(otp.toString(), OtpObj.otp)){
            await Otp.deleteMany({id: id});
            return res.status(200).json({message: "OTP verified successfully!"});
        }

        return res.status(400).json({message: "OTP is incorrect"});

    }
    catch(err){
        next(err);
    }
};


module.exports = { SendOTP, VerifyOTP };