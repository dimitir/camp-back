import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getHikeItem } from '../../../db/hike';
import Logger from '../../../lib/logger';
const logger = new Logger();


const getHikeOne = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`>>>>>> Come in getHikeOne controller`);
    let id;
    if (req.body.id) {
        id = req.body.id
    }
    else {
        return next(createError(403, ' parametre id is nessesary'));
    }
    try {
        const hike = await getHikeItem(id);
        // console.log(hike);
        logger.info(`<<<<<< Come out getHikeOne controller`);
        res.send(hike);
    }
    catch{
        return next(createError(403, ' getHikeOne failure'));
    }
}


export default getHikeOne;