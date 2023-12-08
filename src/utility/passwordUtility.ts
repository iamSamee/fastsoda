import {Request} from 'express';
import bcrypt from 'bcrypt';
import { AuthPaylaod } from '../dto';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';


export const generateSalt = async () => {
    return await bcrypt.genSalt()
}

export const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (password: string, savedPassword: string, salt: string) => {
    return await generatePassword(password, salt) === savedPassword;
}

export const generateToken = (payload: AuthPaylaod)=> {
    return jwt.sign(payload, APP_SECRET, {expiresIn: '1h'});
}

export const validateToken = async (req: Request) => {
    const token = req.get('Authorization');
    
    if(token){
        const payload = await jwt.verify(token.split(' ')[1], APP_SECRET) as AuthPaylaod;
        req.user = payload;
        return true;
    }
    return false;   
}