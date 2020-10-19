import mongoose from 'mongoose';


const User = new mongoose.Schema({
    jwt: String,
    email: String,
    auth: Boolean,
    provider: String,
    providerId: String,
    firstName: String,
    lastName: String,
    picture: String,
    hikesLead: Array,

});

export const UserSchema = mongoose.model("user", User);

    