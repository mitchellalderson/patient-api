import { Request, Response, NextFunction } from 'express';
import { NotFoundError, ValidationError, AuthorizationError } from '../utils/errors';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({ 
      status: 'error',
      message: error.message 
    });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ 
      status: 'error',
      message: error.message 
    });
  }

  if (error instanceof AuthorizationError) {
    return res.status(403).json({ 
      status: 'error',
      message: error.message 
    });
  }

  console.error(error);
  return res.status(500).json({ 
    status: 'error',
    message: 'Internal server error' 
  });
};
