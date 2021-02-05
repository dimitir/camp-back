import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import createError from 'http-errors';
import env from '../../../env';
import { getUserByEmail, getUserByIdAndUpdateFromProvider, createUserFromProvider } from '../../../db/user';
import generateJwt from './_generateJwt';
import Logger from '../../../lib/logger';
const logger = new Logger();

const sendUserDataGoogleAuth = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`>>>>>> Come in sendUserDataGoogleAuth controller`);
    if (req.body.tokenId) {
        const client = new OAuth2Client(env.googleId);
        let payload: any;
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenId,
                audience: env.googleId,
            });
            payload = ticket.getPayload();

        } catch (e) { return next(createError(403, 'cennot verify jwt, from google')); };



        let user, jwt;
        try {
            if (payload) {
                user = await getUserByEmail((payload['email'] as string));
                jwt = generateJwt((payload['email'] as string), 24 * 60);
            }
        } catch (e) { return next(createError(403, 'error occurred when get user by email')); }



        if (user) {
            try {
                const userUpdate = await getUserByIdAndUpdateFromProvider({
                    id: user._id,
                    jwt: (jwt as string),
                    provider: 'google',
                    providerId: payload['sub'],
                    firstName: payload['given_name'],
                    lastName: payload['family_name'],
                    picture: (payload['picture'] as string),
                });
                logger.info(`<<<<<< Come out sendUserDataGoogleAuth_1 controller`);
                res.send(userUpdate);
            } catch { return next(createError(403, 'error occurred when getUserByIdAndUpdateFromProvider ')); }
        }

        else {
            try {
                const userProvider = await createUserFromProvider({
                    jwt: (jwt as string),
                    provider: 'google',
                    email: (payload['email'] as string),
                    providerId: (payload['sub'] as string),
                    firstName: (payload['given_name'] as string),
                    lastName: (payload['family_name'] as string),
                    picture: (payload['picture'] as string),
                });
                logger.info(`<<<<<< Come out sendUserDataGoogleAuth_2 controller`);
                res.send(userProvider);
            } catch { return next(createError(403, 'error occured in func createUserFromProvider')); }
        }
    }
}


export default sendUserDataGoogleAuth;