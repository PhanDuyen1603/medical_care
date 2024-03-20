import express, { NextFunction, Request, Response } from 'express'
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { SpecialistController } from './specialist.controller'

const router = express.Router()

router.get('/', SpecialistController.getAllSpecialist)
router.post('/', 
  auth(AuthUser.ADMIN), 
  (req: Request, res: Response, next: NextFunction) => {
    return SpecialistController.createSpecialist(req, res, next)
  }
)
router.delete('/:id',
  auth(AuthUser.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    return SpecialistController.deleteSpecialist(req, res, next)
  }
)
router.patch('/:id',
  auth(AuthUser.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    return SpecialistController.updateSpecialist(req, res, next)
  }
)

export const SpecialistRoutes = router