const { Login, Register, ChangePassword } = require('../controllers/userControllers.js');

const router = require("express").Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/changepassword', ChangePassword);



module.exports = router;