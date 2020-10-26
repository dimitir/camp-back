import { Application } from 'express';
import JWTStrategy from './strategies/jwt';

const pipe = (...functions: any[]) => (args: Application) => functions.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = (app: Application) => {
    pipe(JWTStrategy)(app);
}

export { initialiseAuthentication }