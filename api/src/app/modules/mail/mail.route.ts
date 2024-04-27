import express, { NextFunction, Request, Response } from 'express';
import { AuthUser } from '../../../enums';
import { auth } from '../../middlewares/auth';
import { MailController } from './mail.controller';

const router = express.Router();

router.post('/', auth(AuthUser.DOCTOR, AuthUser.ADMIN), MailController.sendingEmail);

export const MailRouter = router;