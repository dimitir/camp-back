import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

import { getHikes } from '../../../db/hike';


const getHikesList = async (req: Request, res: Response, next: NextFunction) => {

    let hikes;
    try {
        hikes = await getHikes();
        res.send(hikes);
    }
    catch{ return next(createError(403, 'getHikesList failure')) }

}


export default getHikesList;

















