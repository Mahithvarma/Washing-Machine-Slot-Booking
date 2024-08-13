const { SendOTP, VerifyOTP } = require('../controllers/otpControllers.js');

const router = require("express").Router();

router.post('/otpsend', SendOTP);
router.post('/otpverify', VerifyOTP);



module.exports = router;