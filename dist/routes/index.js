"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const book_route_1 = require("../modules/book/book.route");
const borrow_route_1 = require("../modules/borrow/borrow.route");
exports.routes = (0, express_1.Router)();
exports.routes.use('/books', book_route_1.bookRoutes);
exports.routes.use('/borrow', borrow_route_1.borrowRoutes);
