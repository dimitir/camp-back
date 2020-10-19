import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

import { createHike } from '../../../db/hike';
import { getUserByEmail, getUserByEmailAndUpdateLead } from '../../../db/user';
import { TypeHike, TypeHikeWrapper } from '../../../db/hike/Types';





const _addHikeToHikeDoc = async (hike: TypeHike) => {
    try { return await createHike(hike); }
    catch{ return createError(403, 'createHike failure') }
}


const _addHikeIdToUserLeader = async (hikeId: string, leadEmail: string) => {
    try {
        const user = await getUserByEmail(leadEmail);
        const arrHikesId = (user as any).hikesLead;
        arrHikesId.push(hikeId);
        const userNew = await getUserByEmailAndUpdateLead({ email: leadEmail, hikesLead: arrHikesId });
        return userNew
    } catch{
        return createError(403, 'add hikeIt to user failure in function _addHikeIdToUserLeader')
    }
}





const addHike = async (req: Request, res: Response, next: NextFunction) => {
    const { hike } = req.body;
    let newHike;
    try {
        newHike = await _addHikeToHikeDoc(hike);
        console.log('newHike');
        console.log(newHike);
    }
    catch{ return next(newHike) }

    let newUser
    try { newUser = await _addHikeIdToUserLeader(newHike._id, hike.leaderEmail) }
    catch{ return next(newUser); }

    try { return await res.status(HttpStatus.OK).send('OK'); }
    catch (e) { return next(createError(403, 'Bed request addHike')) }

}


export default addHike;