const { User } =require ("../database/User");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const sendEmail = require("./sendEmail");
const brcypt = require('bcryptjs');
const verifyRecaptcha  = require("./recaptcha");
function generateToken(user) {
    const { _id, name, email, image,emailVerification,isVerified} = user;

    return jwt.sign({
        _id, name, email, image,emailVerification,isVerified                                                                                   
    }, config.JWT_SECRET_KEY);

}

async function register(req, res) {
    try {
        let {
            email, password,username,name,tokenRecaptcha
        } = req.body;
        let captcha = await verifyRecaptcha(tokenRecaptcha)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        if (!email || !password) {
            return res.status(400).send({
                error: 'Incomplete data'
            })
        }

        let user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).send({
                error: 'User with email already exists'
            })
        }

        password = brcypt.hashSync(password);

        user = await User.create({
            name, email,
            signinMethod: 'email-password',
            password,username,
            isVerified:false
        });

        const token = generateToken({
            ...user,
            emailVerification:true
        });
        const { _id} = user;
        sendEmail(email,'Email Verification',token)
        return res.send({
            message: 'Verification mail sent successfully',
            data: {
                token,
                user: {
                    _id, name, email,username
                }
            }
        })

    } catch(err) {
        console.log(err)
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function login(req, res) {
    try {

        const {
            email, password,tokenRecaptcha
        } = req.body;
        let captcha = await verifyRecaptcha(tokenRecaptcha)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        
        let user = await User.findOne({
            email, 
        })
        if (!user || !brcypt.compareSync(password, user.password)) {
            return res.status(400).send({
                error: 'Invalid credentials'
            })
        }

        // Create JWT token
        const token = generateToken(user);
        delete user.password;

        return res.send({
            message: 'Login successful',
            data: {
                token,
                user
            }
        })

    } catch(err) {
        console.log(err);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function getLoggedInUser(req, res) {
    try {
        const user = req.user;

        return res.send({
            data: user
        })


    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function googleLogin(req,res){
    try {
        let {token} = req.body
        let {email,name,picture:image} = jwt.decode(token)
        let user = await User.findOne({
            email,
        })
        if(!user){
            user = await User.create({
                name, email, 
                signinMethod: 'google-signin',image,
                isVerified:true
            });
            req.body.redirect = true
        }else {
            if(!user.isVerified){
               await User.findByIdAndUpdate(user._id,{$set:{isVerified:true}})
            }
            if(!user.image){
               await User.findOneAndUpdate({_id:user._id},{$set:{image}})
            }}
        token = generateToken(user);
        user = await User.findOne({
            email,
        })
        delete user.password;

        return res.send({
            message: 'Login successful',
            data: {
                token,
                user
            }
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

async function forgetPassword(req,res){
    try {
        let {email,tokenRecaptcha} = req.body
        let captcha = await verifyRecaptcha(tokenRecaptcha)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        let user = await User.findOne({
            email, 
        })

        if (user) {
            const token = generateToken({email});
            const response = await sendEmail(user.email,'Reset Password',token)
            if(!response){
                return res.status(400).send({
                    error: 'Something went wrong'
                })
            }
        }

        return res.send({
            message: 'Reset link sent to your email',
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

async function resetPassword(req,res){
    try {
        let {token,password,recaptchaToken} = req.body
        let {email} = jwt.verify(token,config.JWT_SECRET_KEY)
        const captcha = await verifyRecaptcha(recaptchaToken)
        if(!captcha){
            return res.status(400).send({
                error: 'Invalid captcha'
            })
        }
        let user = await User.findOne({
            email, 
        })
        if(!user){
            return res.status(400).send({
                error: 'Invalid token'
            })
        }
        password = brcypt.hashSync(password);
        user.password = password
        await user.save()
        return res.send({
            message: 'Password reset successful',
        })
    } catch (error) {
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
}

async function checkToken(req,res){
    try {
        const {token} = req.body
        let {email,iat,emailVerification} = jwt.verify(token,config.JWT_SECRET_KEY)
        if(!email && !emailVerification ){
            throw new Error()
        }
        if(iat+15*60<Math.floor(Date.now()/1000)){
            return res.send({
                message: 'Time expired',
                result:false
            })    
        }
        return res.send({
            message: 'Token verified',
            result:true
        })
    } catch (error) {
        return res.send({
            message: 'Token not verified',
            result:false
        })
    }
}

async function checkUsernameAvailability(req,res){
    try{
        const {username} = req.body
        let user = await User.findOne({
            username:username, 
        })
        if(user){
            return res.send({
                result: 'Username exists'
            })
        }else{
            return res.send({
                result: 'Available',
                isAvailable:true
            })
        }
    }catch(error){
        return res.send({
            message: 'Something went wrong',
        })
    }
}

async function verifyEmail(req,res){
    try{
        const {token} = req.body
        let {email,iat} = jwt.verify(token,config.JWT_SECRET_KEY)
        if(!email ){
            throw new Error()
        }
        const user = await User.findOne({email})
        if(user.isVerified){
            return res.send({
                message: 'Email Already Verified'
            })
        }else if(iat+6*60*60<Math.floor(Date.now()/1000)){
            return res.status(400).send({
                message: 'Time expired',
                result:false
            })
        }else{
            await User.findByIdAndUpdate(user._id,{$set:{isVerified:true}})
            return res.send({
                message: 'Email Verified Successfully'
            })
        }
    }catch{
        return res.status(400).send({
            message: 'Token not verified',
            result:false
        })
    }
}

async function sendVerifyEmail(req,res){
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                message: 'User not found'
            })
        }
        if(user.isVerified){
            return res.status(400).send({
                message: 'Email Already Verified'
            })
        }
        const token = generateToken({email})
        const response = await sendEmail(user.email,'Email Verification',token)
        if(!response){
            return res.status(400).send({
                message: 'Something went wrong'
            })
        }
        return res.send({
            message: 'Verification mail sent successfully'
        })
        
    }catch(error){
        return res.status(400).send({
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    register,
    login,
    getLoggedInUser,
    googleLogin,
    forgetPassword,
    resetPassword,
    checkToken,
    checkUsernameAvailability,
    verifyEmail,
    sendVerifyEmail
}