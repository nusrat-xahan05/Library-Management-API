"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZodSchema = void 0;
const zod_1 = require("zod");
exports.borrowZodSchema = zod_1.z.object({
    book: zod_1.z
        .string({
        invalid_type_error: 'Book ID must be a string',
        required_error: 'Book ID is required'
    }),
    quantity: zod_1.z
        .number({
        invalid_type_error: 'Quantity Must be a Number',
        required_error: 'Quantity Number is required',
    }).int({
        message: 'Book Quantity Must be an Integer'
    }).min(1, {
        message: 'Quantity must be a Positive Number'
    }),
    dueDate: zod_1.z
        .string({
        required_error: 'Due Date is required',
        invalid_type_error: 'Due Date must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)'
    }).datetime('Due Date must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)'),
});
