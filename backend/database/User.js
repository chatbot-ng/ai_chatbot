
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    image: String,
    signinMethod: String, // 'email-password', 'google-oauth'
    isVerified:Boolean,
    username:String
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema) // collection - users

module.exports = {User}