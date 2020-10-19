import { HikeSchema } from './schema';
import { TypeHike } from './Types';


const createHike = async (hike: TypeHike) => {
    const hikeCreated = await HikeSchema.create(hike);
    return await hikeCreated.save();
}

export {
    createHike,
}
