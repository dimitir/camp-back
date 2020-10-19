import { Request, Response } from 'express';

export default [
    {
        path: '/api/v1/tasks', // TODO: accessStrategy by userID[]!!!
        method: 'get',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                // @ts-ignore
                // const result = await getTasks(query.userResponsibleId, query.startDate, query.endDate);
                res.send('result work AT system');
            },
        ],
    }]