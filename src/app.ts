import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { routes } from "./routes";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware";

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({
            success: true,
            message: "Library Management API is Running..."
        })
    } catch (error) {
        next({
            message: 'API is Not Running...',
            error: error
        });
    }
})
