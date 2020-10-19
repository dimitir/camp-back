import { Document } from 'mongoose';

interface Iproviders {
    provider: String,
    providerId: String
}

/* 
export interface IUser extends Document {
    email: string;
    jwt: string;
    auth: boolean;
    providers: [{
        provider: string,
        providerId: string,
        firstName: string,
        lastName: string,
        displayName: string,
    }];
} */


export interface TypeCreateUserProvider {
    jwt: string;
    email: string;
    provider: string;
    providerId: string;
    firstName: string;
    lastName: string;
    picture?: string;
    locale?: string;
}