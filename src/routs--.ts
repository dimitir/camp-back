import { Application } from "express";
import authRoutes from './servise/auth/auth.routs';
import hikeRoutes from './servise/hike/routs';
import { baseApiUrl } from './env';


const routsApp = (app: Application) => {
    app.use(`${baseApiUrl}/auth`, authRoutes);
    app.use(`${baseApiUrl}/hike`, hikeRoutes);
}

export default routsApp;