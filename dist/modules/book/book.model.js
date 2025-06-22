"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'This ISBN Already Exists! It Must be Unique'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.method('updateBookAvailability', function updateBookAvailability() {
    this.available = this.copies > 0;
});
bookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
