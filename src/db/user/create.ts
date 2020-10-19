import { UserSchema } from './schema';
import { TypeCreateUserProvider } from './Types';

const createUser = async (token: string, email: string) => {

    const userAuthData = {
        jwt: token,
        email: email,
        auth: false,
        provider: 'email',
        providerId: null,
        firstName: null,
        lastName: null,
        picture: null,
    };


    const authFirst = await UserSchema.create(userAuthData);
    return await authFirst.save();
}


const createUserFromProvider = async ({
    jwt,
    email,
    provider,
    providerId,
    firstName,
    lastName,
    picture,
}: TypeCreateUserProvider
) => {
    const userAuthData = {
        jwt,
        email,
        auth: true,
        provider,
        providerId,
        firstName,
        lastName,
        picture,
    };
    const authFirst = await UserSchema.create(userAuthData);
    const user = await authFirst.save();
    console.log('user');
    console.log(user);
    return user;
}

export {
    createUser,
    createUserFromProvider
}
