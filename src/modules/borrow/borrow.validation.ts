import { z } from "zod";

export const borrowZodSchema = z.object({
    book: z
        .string({
            invalid_type_error: 'Book ID must be a string',
            required_error: 'Book ID is required'
        }),

    quantity: z
        .number({
            invalid_type_error: 'Quantity Must be a Number',
            required_error: 'Quantity Number is required',
        }).int({
            message: 'Book Quantity Must be an Integer'
        }).min(1, {
            message: 'Quantity must be a Positive Number'
        }),

    dueDate: z
        .string({
            required_error: 'Due Date is required',
            invalid_type_error: 'Due Date must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)'
        }).datetime('Due Date must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)'),
})
