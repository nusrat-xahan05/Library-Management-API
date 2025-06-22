import { Router } from "express";
import { borrowABook, getBorrowedBooksSummary } from "./borrow.controller";

export const borrowRoutes = Router()

borrowRoutes.post('/', borrowABook)
borrowRoutes.get('/', getBorrowedBooksSummary)

