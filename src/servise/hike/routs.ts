import express, {Request, Response, NextFunction} from 'express';
import addHike from './utilites/addHike';
import getHikesList from './utilites/getHikesList';
import getHikeOne from './utilites/getHikeOne';

const router = express.Router();
const jsonParser = express.json();


export default [
    {
        path: '/api/hike/test',
        method: 'get',
        handler: [
            (req: Request, res: Response, next: NextFunction): void => {
                console.log(' ckram skram!!!')
                res.send('ckram skram!!!')
            },
        ],
    },
    {
        path: '/api/hike/test',
        method: 'post',
        handler: [
            (req: Request, res: Response, next: NextFunction): void => {
                console.log(' ckram skram')
                res.send('ckram skram')
            },
        ],
    },
    {
        path: '/api/hike/add',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                console.log('add add add')
                console.log('add add add')
                console.log('add add add')
                await addHike(req, res, next);
            },
        ],
    },

    {
        path: '/api/hike/list', // TODO: accessStrategy by userID[]!!!
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await getHikesList(req, res, next);
            },
        ],
    },
    {
        path: '/api/hike/getOne',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                await getHikeOne(req, res, next);
            },
        ],
    },
]
