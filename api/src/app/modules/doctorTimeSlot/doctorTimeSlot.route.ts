import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { doctorTimeSlotController } from './doctorTimeSlot.controller';

const router = express.Router();

router.get('/my-slot', auth(AuthUser.DOCTOR), doctorTimeSlotController.getMyTimeSlot);
router.post('/create', auth(AuthUser.ADMIN, AuthUser.DOCTOR), doctorTimeSlotController.createTimeSlot);
router.get('/', doctorTimeSlotController.getAllTimeSlot);
router.patch('/', auth(AuthUser.ADMIN, AuthUser.DOCTOR), doctorTimeSlotController.updateTimeSlot);
router.delete('/:id', auth(AuthUser.ADMIN, AuthUser.DOCTOR), doctorTimeSlotController.deleteTimeSlot);
router.delete('/schedule/:id', auth(AuthUser.ADMIN, AuthUser.DOCTOR), doctorTimeSlotController.deleteTimeShcedule);
router.get('/:id', auth(AuthUser.ADMIN, AuthUser.DOCTOR), doctorTimeSlotController.getTimeSlot);
router.get('/appointment-time/:id', doctorTimeSlotController.getAppointmentTimeOfEachDoctor);
router.get('/appointment-times/:id', doctorTimeSlotController.getAllAppointmnetTimeSlot);

export const DoctorTimeSlotRouter = router;