import {Router, Application, Request, Response, NextFunction} from 'express';
import authRoutes from './servise/auth/auth.routs';
import hikeRoutes from './servise/hike/routs';
import {baseApiUrl} from './env';


const routsApp = (app: Application) => {
    app.use(`${baseApiUrl}/auth`, authRoutes);
    // app.use(`${baseApiUrl}/hike`, hikeRoutes);
}

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route | Route[], router: Router): void => {
    const routesArray = Array.isArray(routes) ? routes : [routes];

    for (const route of routesArray) {
        const {method, path, handler} = route;
        const handleArray = Array.isArray(handler) ? handler : [handler];
        (router as any)[method](
            path,
            handleArray.map(
                (handler): Handler => async (req, res, next): Promise<void> => {
                    try {
                        await handler(req, res, next);
                    } catch (error) {
                        next(error);
                    }
                },
            ),
        );
    }
};


export default routsApp;