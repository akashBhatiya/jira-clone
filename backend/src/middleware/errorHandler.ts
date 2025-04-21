// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

// Custom error class
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middleware with all 4 parameters
export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {  // Return type is void, not Response
  console.error(err);

  // If it's our custom error, use its status code
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
    return;
  }

  // Default to 500 error
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
};