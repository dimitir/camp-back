import { Router, Request, Response, NextFunction } from 'express';


type Wrapper = (router: Router) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper | Wrapper[], router: Router): void => {
    const wrapperArray = Array.isArray(middlewareWrappers) ? middlewareWrappers : [middlewareWrappers];
    for (const wrapper of wrapperArray) {
        wrapper(router);
    }
};

