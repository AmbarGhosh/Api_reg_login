const Users = require('../model/User')
const Utils = require("../utils/utils")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// show all data
const index = async (req, res) => {
    try {
        const showUser = await Users.find();
        res.status(200).json({ success: true, "msg": 'Data showing successfully', data: showUser })
    } catch (error) {
        res.status(404).json({ status: false, "msg": "data not found", "message": error })
        console.log('error : ', error)
    }
}


// create users
const register = async (req, res) => {
    const { name, email, phone, password, re_password } = req.body;
    const newPassword = Utils.securePassword(password);
    const new_rePassword = Utils.securePassword(re_password);

    try {
        const registerUser = await new Users({
            name: name,
            email: email,
            phone: phone,
            password: newPassword,
            re_password: new_rePassword
        })
        console.log('user data' + registerUser)

        const registered = await registerUser.save();

        const token = jwt.sign({ userId: registerUser._id.toString() }, 'ihaveyourdataandyourcredentials', { expiresIn: "10s" })
        console.log(`register token => ${token}`)
        registerUser.tokens = registerUser.tokens.concat({ token: token });
        await registerUser.save()

        res.cookie('reg-cookie',token,{
            expires: new Date(Date.now() + 60000),
            httpOnly:true
        });      

        res.status(200).json({ success: true, "msg": "user registered successfully...", data: registered })
    } catch (err) {
        res.status(404).json({ success: false, "msg": "something went wrong...,Try after sometimes..!" })
        console.log(err)
    }

}

// users login
const login = async (req, res) => {

    try {
        const email = req.body.email
        const password = req.body.password

        const userEmail = await Users.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, userEmail.password)

        const token = jwt.sign({ userId: userEmail._id.toString() }, 'ihaveyourdataandyourcredentials', { expiresIn: "1m" })
        console.log(`login token => ${token}`)
        userEmail.tokens = userEmail.tokens.concat({ token: token });
        await userEmail.save()

        res.cookie('log-cookie',token,{
            expires: new Date(Date.now() + 60000),
            httpOnly:true
        });

        if (isMatch) {
            res.status(200).json({ "message": 'user logged in successfully... ', data: userEmail })
        }
        else {
            res.status(404).json('invalid email or password')
        }

    } catch (error) {
        res.status(404).json('invalid email or password')
        console.log('error : ', error)
    }
}

module.exports = {
    index, register, login
}