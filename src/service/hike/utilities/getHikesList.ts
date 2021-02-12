import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import Logger from '../../../lib/logger';
const logger = new Logger();
import { getHikes } from '../../../db/hike';


const getHikesList = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`>>>>>> Come in getHikesList controller`);
    let hikes;
    try {
        hikes = await getHikes();
        logger.info(`<<<<<< Come out getHikesList controller`);
        res.send(hikes);
    }

    catch{ return next(createError(403, 'getHikesList failure')) }

}


export default getHikesList;

















