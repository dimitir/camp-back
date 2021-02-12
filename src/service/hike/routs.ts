import { Request, Response, NextFunction } from "express";
import addHike from "./utilities/addHike";
import getHikesList from "./utilities/getHikesList";
import getHikeOne from "./utilities/getHikeOne";

// import {validateBody} from '../../middleware/validate';

export default [
  {
    path: "/api/hike/test",
    method: "post",
    handler: [
      (req: Request, res: Response, next: NextFunction): void => {
        res.send("ckram skram!!!");
      },
    ],
  },
  {
    path: "/api/hike/addHike",
    method: "post",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await addHike(req, res, next);
      },
    ],
  },

  {
    path: "/api/hike/list", // TODO: accessStrategy by userID[]!!!
    method: "get",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await getHikesList(req, res, next);
      },
    ],
  },
  {
    path: "/api/hike/getHikeById",
    method: "get",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await getHikeOne(req, res, next);
      },
    ],
  },
];
