import {Request, Response, NextFunction} from 'express';
import {
    loginSendMailSaveUser, isAuthorizedFromMail, sendUserDataAuth,
    sendUserDataGoogleAuth, sendUserDataFacebookAuth
} from './utilities';
import passport from 'passport';

export default [
    {
        path: '/api/auth/profile',
        method: 'post',
        handler: [
            /*for work  passport.js  need to attach token for query on frontend*/
            passport.authenticate('jwt', {session: false}),
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                res.send({text: 'rabotaet'});
            },
        ],
    },
    {
        path: '/api/auth/loginEmail',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await loginSendMailSaveUser(req, res, next);
            },
        ],
    },
    {
        path: '/api/auth/userData',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await sendUserDataAuth(req, res, next);
            },
        ],
    },
    {
        path: '/api/auth/account',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await isAuthorizedFromMail(req, res, next);
            },
        ],
    },
    {
        path: '/api/auth/google',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await sendUserDataGoogleAuth(req, res, next);
            },
        ],
    },
    {
        path: '/api/auth/facebook',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await sendUserDataFacebookAuth(req, res, next);

            },
        ],
    },
]


/*router.post('/loginEmail', jsonParser, (req: Request, res: Response, next: NextFunction) => {
    loginSendMailSaveUser(req, res, next);
});


router.post('/userData', jsonParser,
    (req: Request, res: Response, next: NextFunction) => {
        sendUserDataAuth(req, res, next);
    }
);


router.get('/account', (req: Request, res: Response, next: NextFunction) => {
    isAuthorizedFromMail(req, res, next);
});


router.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.send('test');
});

router.post('/google', jsonParser,
    (req: Request, res: Response, next: NextFunction) => {
        sendUserDataGoogleAuth(req, res, next);
    }
);


router.post('/facebook', jsonParser,
    (req: Request, res: Response, next: NextFunction) => {
        console.log('facebook');
        sendUserDataFacebookAuth(req, res, next);
    }
);*/


// export default router;
