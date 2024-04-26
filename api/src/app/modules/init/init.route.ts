import express, { NextFunction, Request, Response } from 'express';
import { InitController } from './init.controller';

const router = express.Router();

router.get('/', InitController.InitSampleData);

export const InitRouter = router;