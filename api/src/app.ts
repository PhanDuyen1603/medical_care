import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import ApiError from './errors/apiError';
import router from './app/routes';
import config from './config';
import swaggerUi from "swagger-ui-express"
import swaggerDocument from './swagger.json'

const app: Application = express();

app.use(cors());
app.use(CookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).end();
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send(config.clientUrl)
})

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
})

app.use('/api/v1', router);

export default app;