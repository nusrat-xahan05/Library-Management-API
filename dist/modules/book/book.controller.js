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
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
const book_validation_1 = require("./book.validation");
const zod_1 = require("zod");
// Create Book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield book_validation_1.bookZodSchema.parseAsync(req.body);
        const data = yield book_model_1.Book.create(payload);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
            data
        });
    }
    catch (error) {
        next({
            message: 'Book Creation Unsuccessful',
            error: error
        });
    }
});
exports.createBook = createBook;
// Get All Books
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const filter = query.filter ? { genre: query.filter } : {};
        const sortField = query.sortBy;
        const sortOrder = query.sort === 'asc' ? 1 : -1;
        const limit = parseInt(query.limit) || 10;
        const data = yield book_model_1.Book.find(filter).sort({ [sortField]: sortOrder }).limit(limit);
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
    }
    catch (error) {
        next({
            message: 'Invalid Query',
            error: error
        });
    }
});
exports.getAllBooks = getAllBooks;
// Get Book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        next({
            message: 'Invalid Book ID',
            error: error
        });
    }
});
exports.getBookById = getBookById;
// Update Book by ID
const updateBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const payload = yield book_validation_1.bookUpdateZodSchema.parseAsync(req.body);
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, payload, { new: true, runValidators: true });
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
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
});
exports.updateBookById = updateBookById;
// Delete Book by ID
const deleteBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        next({
            message: 'Invalid Book ID',
            error: error
        });
    }
});
exports.deleteBookById = deleteBookById;
