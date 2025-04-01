import { Request, Response, NextFunction } from 'express';

// Error handler middleware
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error',
    });
};

// Async handler to avoid try-catch blocks
export const asyncHandler = (fn: Function) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};