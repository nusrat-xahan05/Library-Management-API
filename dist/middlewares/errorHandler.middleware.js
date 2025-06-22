"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    const customError = err.error;
    const customMessage = err.message;
    // Custom Zod Validation
    if (customError instanceof zod_1.ZodError) {
        const formattedErrors = {};
        customError === null || customError === void 0 ? void 0 : customError.errors.forEach((error) => {
            const field = error.path[0];
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
        });
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
    if ((customError === null || customError === void 0 ? void 0 : customError.name) === 'MongooseError') {
        res.status(400).json({
            message: customMessage,
            success: false,
            error: {
                name: 'Validation Failed',
                errors: customError === null || customError === void 0 ? void 0 : customError.message
            }
        });
        return;
    }
    // Custom Error For Backup
    res.status(400).json({
        message: customMessage,
        success: false,
        error: {
            name: customError === null || customError === void 0 ? void 0 : customError.name,
            errors: customError === null || customError === void 0 ? void 0 : customError.errors
        }
    });
};
exports.globalErrorHandler = globalErrorHandler;
