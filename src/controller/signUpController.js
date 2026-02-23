const UserModel = require("../model/userSchema");
const emailOTP = require("../utils/emailOTP");
const emailVerify = require("../utils/emailVerify");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require('bcrypt');

// sign up
const SignUpController = async (req, res) => {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    if (emailVerify(email) === false) {
        return res.status(400).json({ success: false, message: 'Invalid Email Address.' })
    }

    let emailExist = await UserModel.findOne({ email })
    if (emailExist) {
        //email exists but not verified
        if (emailExist.verify === false) {
            return res.status(200).json({
                success: false,
                isUnverified: true,
                message: 'Account not verified. Please verify your email.'
            })
        }
        return res.status(400).json({ success: false, message: 'Email already exists.' })
    }

    //create account
    let otp = emailOTP()
    bcrypt.hash(password, 10, async function (err, hash) {
        let user = new UserModel({ name, email, password: hash, otp })
        await user.save()
            .then(() => {
                sendEmail(email, otp)
                return res.status(200).json({ success: true, message: 'User Created Successfully.', data: { name: user.name, email: user.email } })
            })
            .catch((err) => {
                return res.status(500).json({ success: false, message: err.message })
            })
    })
}

//otp verify
const OtpVerifyController = async (req, res) => {
    let { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    let user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found!' })
    } else {
        if (user.otp == otp) {
            let verify = await UserModel.findOneAndUpdate(
                { email },
                { verify: true },
                { new: true },
            ).select('-password')
            return res.status(200).json({ success: true, message: 'OTP verified successfully.', data: verify })
        } else {
            return res.status(404).json({ success: false, message: 'OTP does not match!' })
        }
    }
}

//login
const LoginController = async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    let user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(404).json({ success: false, message: 'Incorrect email.' })
    }

    if (user.verify === false) {
        return res.status(403).json({
            success: false,
            message: 'Account not verified. Please verify your email first.',
            isUnverified: true
        });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
            return res.status(200).json({ success: true, message: 'Login successful.', data: user })
        } else {
            return res.status(404).json({ success: false, message: 'Incorrect password.' })
        }
    });
}

//get all users
const AllUserController = async (req, res) => {
    try {
        let allusers = await UserModel.find({}).select('-password')
        return res.status(200).json({ success: true, message: 'fetch all users.', data: allusers })
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message })
    }
}

module.exports = { SignUpController, OtpVerifyController, LoginController, AllUserController };