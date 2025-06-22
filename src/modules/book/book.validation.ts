import { z } from "zod";

export const bookZodSchema = z.object({
    title: z
        .string({
            invalid_type_error: 'Title Must be a String',
            required_error: 'Title is required'
        }),

    author: z
        .string({
            invalid_type_error: 'Author Must be a String',
            required_error: 'Author is required'
        }),

    genre: z
        .enum(
            ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            {
                errorMap: (issue, value) => {
                    return { message: `${value.data} is not Acceptable Data` };
                }
            }
        )
        .optional()
        .refine((val) => val !== undefined, { message: 'Genre is required' }),

    isbn: z
        .string({
            invalid_type_error: 'ISBN Must be a String',
            required_error: 'ISBN is required',
        }),

    description: z
        .string({
            invalid_type_error: 'Description Must be a String'
        }).optional(),

    copies: z
        .number({
            invalid_type_error: 'Copies Must be a Number',
            required_error: 'Copies Number is required'
        }).int({
            message: 'Book Copies Must be an Integer'
        }).min(0, {
            message: 'Copies must be a Positive Number'
        }),

    available: z
        .boolean({
            invalid_type_error: 'Availability Must be a Boolean Value',
        }).optional()
})

export const bookUpdateZodSchema = bookZodSchema.partial();