"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooksSummary = exports.borrowABook = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const borrow_validation_1 = require("./borrow.validation");
const zod_1 = require("zod");
// Create Borrow
const borrowABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield borrow_validation_1.borrowZodSchema.parseAsync(req.body);
        const { book: bookId, quantity, dueDate } = payload;
        const book = yield book_model_1.Book.findById(bookId);
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
        yield book.save();
        const data = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
});
exports.borrowABook = borrowABook;
// Get Borrowed Books Summary
const getBorrowedBooksSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
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
        ]);
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
    }
    catch (error) {
        next({
            message: 'Invalid Operation',
            error: error
        });
    }
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
