const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    phone: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    re_password: { type: String, require: true, trim: true },
    tokens: [{ token: { type: String, require: true, trim: true } }]

}, {
    timestamps: true
})

const userRegister = new mongoose.model('userregister', userSchema)
module.exports = userRegister