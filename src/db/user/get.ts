import { UserSchema } from './schema';

const getUserByEmail = async (userEmail: string) => {
    return await UserSchema.findOne({ email: userEmail })
};




const getUserByEmailAndUpdateLead = async ({ email, hikesLead, }: { email: string, hikesLead: Array<String> }) => {
    const userData = await UserSchema.findOneAndUpdate({ email: email }, { hikesLead: hikesLead });
    return userData;
}


const getUserByIdAndUpdate = async (id: string, jwt: string) => {
    const userData = await UserSchema.findOneAndUpdate({ _id: id }, { jwt: jwt, auth: true });
    return userData;
}


interface IgetUserByIdAndUpdateProvider {
    id: string;
    jwt: string;
    provider: string,
    providerId: string,
    firstName: string,
    lastName: string,
    picture: string,

}
const getUserByIdAndUpdateFromProvider =
    async ({ id, jwt, provider, providerId, firstName, lastName, picture }: IgetUserByIdAndUpdateProvider) => {
        const userData = await UserSchema.findOneAndUpdate({ _id: id }, {
            $set: {
                jwt: jwt,
                auth: true,
                provider: provider,
                providerId: providerId,
                firstName: firstName,
                lastName: lastName,
                picture: picture
            }
        }, { new: true });
        console.log('userData');
        console.log(userData);
        return userData;
    }

const getUserByProviderId = async (id: string) => {
    console.log('getUserByProviderId');
    return await UserSchema.findOne({ providerId: id })
}

export { getUserByEmail, getUserByIdAndUpdate, getUserByProviderId, getUserByIdAndUpdateFromProvider, getUserByEmailAndUpdateLead };

