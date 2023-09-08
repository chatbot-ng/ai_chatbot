
import mongoose from 'mongoose'

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

export const User = mongoose.model('User', UserSchema) // collection - users
