
import { Router } from 'express';
import { register, login, getLoggedInUser, googleLogin, forgetPassword, resetPassword, checkToken, sendVerifyEmail, checkUsernameAvailability, verifyEmail } from '../controllers/auth.js';
import authMiddleware from '../middlewares/auth.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/googlelogin', googleLogin);
authRouter.get('/loggedInUser', authMiddleware, getLoggedInUser);
authRouter.post('/forgetPassword', forgetPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.post('/checkToken', checkToken);
authRouter.post('/verifyEmail', verifyEmail);
authRouter.post('/checkUsername', checkUsernameAvailability);
authRouter.post('/sendVerifyEmail', sendVerifyEmail);

// export default authRouter;
export default authRouter;