import express, {Request, Response, NextFunction} from 'express';


const router = express.Router();
const jsonParser = express.json();


export default [
    {
        path: '/api/blog/test',
        method: 'get',
        handler: [
            (req: Request, res: Response, next: NextFunction): void => {
                console.log(' ckram skram!!!')
                res.send('ckram skram!!!')
            },
        ],
    },
    {
        path: '/api/blog/test',
        method: 'post',
        handler: [
            (req: Request, res: Response, next: NextFunction): void => {
                console.log(' ckram skram')
                res.send('ckram skram')
            },
        ],
    },
    {
        path: '/api/blog/add',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                // await addHike(req, res, next);
            },
        ],
    },

    {
        path: '/api/blog/list', // TODO: accessStrategy by userID[]!!!
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                // await getHikesList(req, res, next);
            },
        ],
    },
    {
        path: '/api/blog/getOne',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                // await getHikeOne(req, res, next);
            },
        ],
    },
]

