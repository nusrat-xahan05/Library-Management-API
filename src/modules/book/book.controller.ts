import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";
import { bookUpdateZodSchema, bookZodSchema } from "./book.validation";
import { ZodError } from "zod";

// Create Book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await bookZodSchema.parseAsync(req.body);
        const data = await Book.create(payload);

        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
            data
        });
    } catch (error: any) {
        next({
            message: 'Book Creation Unsuccessful',
            error: error
        });
    }
}

// Get All Books
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query: any = req.query;

        const filter = query.filter ? { genre: query.filter } : {};
        const sortField = query.sortBy;
        const sortOrder = query.sort === 'asc' ? 1 : -1;
        const limit = parseInt(query.limit) || 10;

        const data = await Book.find(filter).sort({ [sortField]: sortOrder }).limit(limit);

        if (!data.length) {
            return next({
                message: 'This Book is Not Available',
                error: data
            });
        }
        res.status(201).json({
            success: true,
            message: "Books Retrieved Successfully",
            data
        });
    } catch (error) {
        next({
            message: 'Invalid Query',
            error: error
        });
    }
}

// Get Book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId)

        if (!data) {
            return next({
                message: 'This Book is Not Available',
                error: data
            });
        }

        res.status(201).json({
            success: true,
            message: "Book Retrieved Successfully",
            data
        });
    } catch (error: any) {
        next({
            message: 'Invalid Book ID',
            error: error
        });
    }
}

// Update Book by ID
export const updateBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const payload = await bookUpdateZodSchema.parseAsync(req.body);
        const data = await Book.findByIdAndUpdate(bookId, payload, { new: true, runValidators: true })

        if (!data) {
            return next({
                message: 'This Book is Not Available',
                error: data
            });
        }
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data
        });

    } catch (error: any) {
        if (error instanceof ZodError) {
            return next({
                message: 'Book Update Unsuccessful',
                error: error
            });
        }
        next({
            message: 'Invalid Book ID',
            error: error
        });
    }
}

// Delete Book by ID
export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndDelete(bookId)

        if (!data) {
            return next({
                message: 'This Book is Not Available',
                error: data
            });
        }

        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    } catch (error: any) {
        next({
            message: 'Invalid Book ID',
            error: error
        });
    }
}

