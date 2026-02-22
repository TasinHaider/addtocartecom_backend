const express = require('express')
const router = express.Router()
const { SignUpController, OtpVerifyController, LoginController, AllUserController } = require('../../../controller/signUpController')

//post
router.post('/signup', SignUpController)
router.post('/verifyotp', OtpVerifyController)
router.post('/login', LoginController)

//get
router.get('/allusers', AllUserController)

module.exports = router;