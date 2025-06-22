"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateZodSchema = exports.bookZodSchema = void 0;
const zod_1 = require("zod");
exports.bookZodSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        invalid_type_error: 'Title Must be a String',
        required_error: 'Title is required'
    }),
    author: zod_1.z
        .string({
        invalid_type_error: 'Author Must be a String',
        required_error: 'Author is required'
    }),
    genre: zod_1.z
        .enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
        errorMap: (issue, value) => {
            return { message: `${value.data} is not Acceptable Data` };
        }
    })
        .optional()
        .refine((val) => val !== undefined, { message: 'Genre is required' }),
    isbn: zod_1.z
        .string({
        invalid_type_error: 'ISBN Must be a String',
        required_error: 'ISBN is required',
    }),
    description: zod_1.z
        .string({
        invalid_type_error: 'Description Must be a String'
    }).optional(),
    copies: zod_1.z
        .number({
        invalid_type_error: 'Copies Must be a Number',
        required_error: 'Copies Number is required'
    }).int({
        message: 'Book Copies Must be an Integer'
    }).min(0, {
        message: 'Copies must be a Positive Number'
    }),
    available: zod_1.z
        .boolean({
        invalid_type_error: 'Availability Must be a Boolean Value',
    }).optional()
});
exports.bookUpdateZodSchema = exports.bookZodSchema.partial();
