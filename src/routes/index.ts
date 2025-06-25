import { Router } from "express";
import { bookRoutes } from "../modules/book/book.route";
import { borrowRoutes } from "../modules/borrow/borrow.route";

export const routes = Router();

routes.use('/api/books', bookRoutes);
routes.use('/api/borrow', borrowRoutes);