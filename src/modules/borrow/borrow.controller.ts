import { NextFunction, Request, Response } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";
import { borrowZodSchema } from "./borrow.validation";
import { ZodError } from "zod";

// Create Borrow
export const borrowABook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await borrowZodSchema.parseAsync(req.body);

        const { book: bookId, quantity, dueDate } = payload;
        const book = await Book.findById(bookId);


        if (!book) {
            return next({
                message: 'This Book is Not Available',
                error: book
            });
        }

        if (book.copies < quantity) {
            return next({
                message: 'Not Enough Copy is Available',
                error: book
            });
        }

        book.copies -= quantity;
        book.updateBookAvailability();
        await book.save();

        const data = await Borrow.create(req.body)

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    } catch (error: any) {
            if (error instanceof ZodError) {
                return next({
                    message: 'Borrowing Book Unsuccessful',
                    error: error
                });
            }
            next({
                message: 'Invalid Book ID',
                error: error
            });
        }
}

// Get Borrowed Books Summary
export const getBorrowedBooksSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: {
                        $sum: '$quantity'
                    }
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn',
                    },
                    totalQuantity: 1
                }
            }
        ])

        if (!data.length) {
            return next({
                message: 'Books Are Not Borrowed Yet',
                error: data
            });
        }

        res.status(201).json({
            success: true,
            message: "Books Retrieved Successfully",
            data
        });
    } catch (error: any) {
        next({
            message: 'Invalid Operation',
            error: error
        });
    }
}