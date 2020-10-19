import { HikeSchema } from './schema';

export const getHikes = async () => {
    return await HikeSchema.find({ openEvent: true }, 'name start finish subsctiption eco difficulty typeHike')
};



export const getHikeItem = async (id: string) => {
    console.group('id inside');
    console.log(id);
    const result = await HikeSchema.findById(id, '-participants -leaderEmail -participans');
    console.log(result);
    return result;
};

/* '-participans, -leaderEmail' */