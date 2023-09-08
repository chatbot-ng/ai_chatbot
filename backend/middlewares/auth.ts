import { verify, decode } from 'jsonwebtoken';
import { User } from "../database/User";
import config from '../config/config';
const {JWT_SECRET_KEY} = config
async function auth(req, res, next) {
    const authorization = req.headers['authorization'];

    if (authorization) {

        // validate the token

        const token = authorization.split(' ').pop();

        if(token) {

            try {
                verify(token, JWT_SECRET_KEY);
    
                let user = decode(token);
    
                user = await User.findById(user._id);
    
                user = user.toJSON();
    
                delete user.password;
    
                // Modify the request object to contain the authenticated user
                req.user = user;
    
                next();
            } catch(err) {
                return res.status(401).send({
                    message: 'Invalid token provided'
                })
            }

        } else {
            return res.status(401).send({
                message: 'No auth token present'
            })
        }

    } else {
        return res.status(401).send({
            message: 'User is not logged in'
        })
    }
}

export default auth;