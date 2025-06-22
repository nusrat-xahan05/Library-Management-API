import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";

export const globalErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const customError = err.error
    const customMessage = err.message

    // Custom Zod Validation
    if (customError instanceof ZodError) {
        const formattedErrors: Record<string, any> = {};

        customError?.errors.forEach((error) => {
            const field = error.path[0]

            formattedErrors[field] = {
                message: error.message,
                name: 'ValidatorError',
                properties: {
                    message: error.message,
                    type: error.code,
                    min: error.code
                    // type: error.code === 'too_small' ? 'min' : error.code,
                    // min: error.code === 'too_small' ? 0 : undefined
                },
                kind: error.code === 'too_small' ? 'min' : error.code,
                path: field
            };
        })

        res.status(400).json({
            message: customMessage,
            success: false,
            error: {
                name: 'Validation Failed',
                errors: formattedErrors
            }
        });
        return;
    }

    // Custom MongooseError
    if (customError?.name === 'MongooseError') {
        res.status(400).json({
            message: customMessage,
            success: false,
            error: {
                name: 'Validation Failed',
                errors: customError?.message
            }
        });
        return;
    }

    // Custom Error For Backup
    res.status(400).json({
        message: customMessage,
        success: false,
        error: {
            name: customError?.name,
            errors: customError?.errors
        }
    });
};
