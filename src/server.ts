import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;
import {port, dbConnectionString} from './env';
import {initialiseAuthentication} from './servise/auth';
import routsApp from './routs';
import {applyRoutes} from './routs';
import routes from './servise/index';
import {applyMiddleware} from './utils';
import entry from "./middleware/entry";


const app = express();

const startServer = () => {
    console.log(port);
    app.listen(port, () => console.log(`App started on port ${port}`));
}

const connectDb = () => {
    console.log('connect db');
    const options = {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false};
    mongoose.connect((dbConnectionString as string), options)
    return mongoose.connection
}


connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);



applyMiddleware(entry, app);
initialiseAuthentication(app);
applyRoutes(routes, app);
routsApp(app);

// app.use('/api', routsApp);


