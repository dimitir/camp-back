
const environment = {
    nodeEnv: (process.env.NODE_ENV as string),
    jwtSecret: (process.env.JWT_SECRET as string),

    mailPassport: (process.env.MAIL_PASSWORD as string),
    mailAccaunt: (process.env.MAIL_ACCAUNT as string),

    port: (process.env.PORT as string),
    host: (process.env.HOST as string),
    hostFront: (process.env.HOST_FRONT as string),

    baseApiUrl: (process.env.BASE_API_URL as string),
    dbConnectionString: (process.env.DB_CONNECTION_STRING as string),

    googleId: (process.env.GOOGLE_CLIENTID as string),
    googleSecret: (process.env.GOOGLE_CLIENTSECRET as string),

    facebookId: (process.env.FACEBOOK_CLIENTID as string),
    facebookSecret: (process.env.FACEBOOK_CLIENTSECRET as string),
}

export const nodeEnv = process.env.NODE_ENV;
export const jwtSecret = process.env.JWT_SECRET;
export const mailPassport = process.env.MAIL_PASSWORD;
export const mailAccaunt = process.env.MAIL_ACCAUNT;
export const port = process.env.PORT;
export const host = process.env.HOST;
export const baseApiUrl = process.env.BASE_API_URL;
export const dbConnectionString = process.env.DB_CONNECTION_STRING;


export default environment