import { Request, Response, NextFunction } from 'express';
import {NotFoundError, ValidationError} from "../utils/errors";

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);


    if (err instanceof ValidationError) {
        res.status(401).json({
            message: err.message || 'Validation Error',
        });
        return;
    }

    if (err instanceof NotFoundError) {
        res.status(400).json({
            message: err.message || 'Validation Error',
        });
        return;
    }


    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};