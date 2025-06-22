import { Router } from "express";
import { createBook, deleteBookById, getBookById, getAllBooks, updateBookById } from "./book.controller";

export const bookRoutes = Router()

bookRoutes.post('/', createBook)
bookRoutes.get('/', getAllBooks)
bookRoutes.get('/:bookId', getBookById)
bookRoutes.put('/:bookId', updateBookById)
bookRoutes.delete('/:bookId', deleteBookById)
