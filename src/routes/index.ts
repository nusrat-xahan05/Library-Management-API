import { Router } from "express";
import { bookRoutes } from "../modules/book/book.route";
import { borrowRoutes } from "../modules/borrow/borrow.route";

export const routes = Router();

routes.use('/books', bookRoutes);
routes.use('/borrow', borrowRoutes);