import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { routes } from "./routes";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware";

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: "Library Management API is Running..."
    })
})
