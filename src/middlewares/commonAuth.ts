import { Request, Response, NextFunction } from 'express';
import { AuthPaylaod } from "../dto";
import { validateToken } from '../utility';

declare global {
    namespace Express {
        interface Request{
            user?: AuthPaylaod
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateToken(req);
    if(validate){
        next();
    }else{
        return res.json({message: "User not Authenticated!!!"})
    }
}