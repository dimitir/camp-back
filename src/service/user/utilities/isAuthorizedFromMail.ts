import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import generateJwt from './_generateJwt';
import createError from 'http-errors';
import env from '../../../env';
import {getUserByEmail, getUserByIdAndUpdate} from '../../../db/user';
import Logger from '../../../lib/logger';
const logger = new Logger();


const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`>>>>>> Come in isAuthorized controller`);
    const auth  = req.query.auth;

    if (!auth || !(auth as string).startsWith('Bearer_')) {
        return next(createError(400, 'Can not verify jwt'));
    }

    const token = (auth as string).substring(7, (auth as string).length);
    let decoded;
    try {
        decoded = jwt.verify(token, env.jwtSecret);
    } catch {
        return next(createError(403, 'cennot verify jwt, decoded failed'));
    }

    if (!decoded.hasOwnProperty('email')
        || !decoded.hasOwnProperty('expiration')) {
        return next(createError(403, 'invalid jwt token, absent necessary data'));
    }


    const {email, expiration} = (decoded as { email: string, expiration: Date });

    if (expiration < new Date()) {
        return next(createError(403, 'token has expired'));
    }

    return (async () => {
        let findUser;
        try {
            findUser = await getUserByEmail(email);
        } catch {
            return next(createError(403, 'failed to find user'));
        }


        try {
            const newJwt = generateJwt(email, 24 * 60);
            if (findUser) {
                const id = findUser._id;
                const authTrue: boolean = true;
                const setData = await getUserByIdAndUpdate(id, newJwt);
                logger.info(`<<<<<< Come out isAuthorized_1 controller`);
                res.redirect(`${env.hostFront}/auth/email/callback?token=${newJwt}`);
            }
            logger.info(`<<<<<< Come out isAuthorized_2 controller`);
        } catch {
            return next(createError(403, 'Failed to update user'));
        }
    })()

}


export default isAuthorized;