import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getHikeItem } from '../../../db/hike';



const getHikeOne = async (req: Request, res: Response, next: NextFunction) => {

    let id;
    if (req.body.id) {
        id = req.body.id
    }
    else {
        return next(createError(403, ' parametre id is nessesary'));
    }
    try {
        const hike = await getHikeItem(id);
        console.log(hike);
        res.send(hike);
    }
    catch{
        return next(createError(403, ' getHikeOne failure'));
    }
}


export default getHikeOne;