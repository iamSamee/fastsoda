import express, { Request, Response, NextFunction } from 'express';
import { customerLogin, customerSignup, customerVerify, editCustomerProfile, getCustomerProfile, requestOtp } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();


/** ---------------Signup / create Customer------------------- */
router.post('/signup', customerSignup);

/** ---------------Login------------------- */
router.post('/login', customerLogin);

//authentication

router.use(Authenticate);
/** ---------------Verify customer account------------------- */
router.patch('/verify', customerVerify);

/** ---------------OTP / Requesting OTP------------------- */
router.get('/otp', requestOtp);

/** ---------------Profile------------------- */
router.get('/profile', getCustomerProfile);
router.patch('/profile', editCustomerProfile);


//Cart
//Order
//Payment
export {router as customerRoutes}