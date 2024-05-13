import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { PaymentController } from './payment.controller'
// import { PaymentService } from './';

const router = express.Router();

router.get('/chart', PaymentController.testPayment);

export const PaymentRouter = router