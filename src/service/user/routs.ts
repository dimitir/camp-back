import { Request, Response, NextFunction } from "express";
import {
  loginSendMailSaveUser,
  isAuthorizedFromMail,
  sendUserDataAuth,
  sendUserDataGoogleAuth,
  sendUserDataFacebookAuth,
} from "./utilities";
import passport from "passport";

export default [
  {
    path: "/api/user/profile",
    method: "post",
    handler: [
      /*for work  passport.js  need to attach token for query on frontend*/
      passport.authenticate("jwt", { session: false }),
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        res.send({ text: "rabotaet" });
      },
    ],
  },
  {
    path: "/api/user/loginEmail",
    method: "post",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await loginSendMailSaveUser(req, res, next);
      },
    ],
  },
  {
    path: "/api/user/userByToken",
    method: "post",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await sendUserDataAuth(req, res, next);
      },
    ],
  },
  {
    path: "/api/user/account",
    method: "get",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await isAuthorizedFromMail(req, res, next);
      },
    ],
  },
  {
    path: "/api/user/google",
    method: "post",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await sendUserDataGoogleAuth(req, res, next);
      },
    ],
  },
  {
    path: "/api/user/facebook",
    method: "post",
    handler: [
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await sendUserDataFacebookAuth(req, res, next);
      },
    ],
  },
];
