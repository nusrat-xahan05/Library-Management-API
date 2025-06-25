"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(routes_1.routes);
exports.app.use(errorHandler_middleware_1.globalErrorHandler);
exports.app.get('/', (req, res) => {
    res.send({
        success: true,
        message: "Library Management API is Running..."
    });
});
