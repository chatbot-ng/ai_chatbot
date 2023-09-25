
import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
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

const User = model('User', UserSchema) // collection - users

export default User