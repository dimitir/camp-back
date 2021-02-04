import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import HttpStatus from 'http-status-codes';
import env from '../../../env';
import createError from 'http-errors';
import { createUser, getUserByEmail } from '../../../db/user';
import generateJwt from './_generateJwt';
import Logger from '../../../lib/logger';
const logger = new Logger();


const emailTemplate = ({ userName, link }: { userName: string, link: string }) => `
    <h2>Eco Foot</h2>
    <p>
    Hi ${userName} Click the link below to sign in to your EcoFoot account.
    This link will expire in 2 hours and can only be used once. Have a good day! 
    ${link}
     </p>
    <a href=${link}>Sing to EcoFoot </a>
`;


const smtpConfig = {
    tls: { rejectUnauthorized: false },
    service: 'gmail',
    auth: {
        user: env.mailAccaunt,
        pass: env.mailPassport
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function (error: any, success: any) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});


const login = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`>>>>>> Come in loginSendMailSaveUser controller`);
    const { email } = req.body;

    if (!email) {
        return next(createError(400, 'Email and lastLocation is required'));
    }

    return (async () => {
        const token = generateJwt(email, 2);
        const mailOptionst = {
            from: '<eco>',
            to: email,
            subject: "Invitation",
            html: emailTemplate({ userName: 'Dear treveler', link: `${env.host}/auth/account?auth=Bearer_${token}` })
        };

        try {
            await transporter.sendMail(mailOptionst);
        } catch{
            return next(createError(403, 'Mail is not send'))
        }

        try { const newUser = await createUser(token, email); }
        catch { return next(createError(403, 'User in not create')) }

        logger.info(`<<<<<< Come out loginSendMailSaveUser controller`);

        try { return await res.status(HttpStatus.OK).send('OK'); }
        catch (e) { return next(createError(403, 'Bed request')) }

    })()
}

export default login;

