import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import axios from 'axios';
import { getUserByEmail, getUserByIdAndUpdateFromProvider, createUserFromProvider } from '../../../db/user';
import generateJwt from './_generateJwt';


const sendUserDataFacebookAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.group('facebook');
    if (req.body.access_token) {
        const access_token = req.body.access_token;
        let data;
        try {
            ({ data } = await axios({
                url: 'https://graph.facebook.com/me',
                method: 'get',
                params: {
                    fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(','),
                    access_token,
                },
            }));
            console.log(data);

        } catch (e) { return next(createError(403, 'cennot verify jwt, from google')); };


        let user, jwt;
        try {
            if (data) {
                user = await getUserByEmail((data['email'] as string));
                jwt = generateJwt((data['email'] as string), 24 * 60);
                console.log(user);
                console.log('user');
            }
        } catch (e) { return next(createError(403, 'error occurred when get user by email')); }


        if (user) {
            try {

                const userUpdate = await getUserByIdAndUpdateFromProvider({
                    id: user._id,
                    jwt: (jwt as string),
                    provider: 'facebook',
                    providerId: data['id'],
                    firstName: data['first_name'],
                    lastName: data['last_name'],
                    picture: `http://graph.facebook.com/${data['id']}/picture?type=normal`,

                });
                res.send(userUpdate);
            } catch { return next(createError(403, 'error occurred when getUserByIdAndUpdateFromProvider ')); }
        }

        else {
            try {
                const userProvider = await createUserFromProvider({
                    jwt: (jwt as string),
                    provider: 'facebook',
                    email: (data['email'] as string),
                    providerId: (data['id'] as string),
                    firstName: (data['first_name'] as string),
                    lastName: (data['last_name'] as string),
                    picture: `http://graph.facebook.com/${data['id']}/picture?type=normal`,
                });
                console.log('userProvider');
                console.log(userProvider);
                res.send(userProvider);
            } catch { return next(createError(403, 'error occured in func createUserFromProvider')); }
        }
    }
}



export default sendUserDataFacebookAuth;