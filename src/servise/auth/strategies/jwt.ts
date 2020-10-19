import passport from 'passport';
import passportJWT from "passport-jwt";
import { jwtSecret } from '../../../env';
import { getUserByEmail } from '../../../db/user';
import ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;


const strategy = () => {

    const jwtOptions = {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
    }

    passport.use(new JWTStrategy(jwtOptions,
        (jwtPayload: any, done: any) => {
            console.log('jwtPayload');
            let email;
           /*  if (!jwtPayload.email) {
                email = 'emailIsNull';
            }
            else {
            } */
            email = jwtPayload.email;
            return (async () => {
                try {
                    const user = await getUserByEmail(email);
                    if (user) {
                        console.log('user had');
                        return done(null, user);
                    }
                    return done(null, false);
                }
                catch (err) {
                    return done(err)
                }

            })()
        }
    ));

}

export default strategy;