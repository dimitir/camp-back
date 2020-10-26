import {Request, Response, NextFunction} from 'express';
import {validateBody} from '../../middleware/validate';

export default [
    {
        path: '/api/test',
        method: 'post',
        handler: [
            // validateBody(['userId']),
            (req: Request, res: Response, next: NextFunction): void => {
                res.send('ckram skram!!!')
            },


        ],
    },


]

