import express, { NextFunction, Request, Response } from 'express'
import { AdminController } from './admin.controller'
import { AuthUser } from '../../../enums';
import { auth } from '../../middlewares/auth';
import { CloudinaryHelper } from '../../../helpers/uploadHelper'; 

const router = express.Router();

// router.get('/',)
router.post('/', AdminController.AdminRegister);
router.delete('/:id', auth(AuthUser.ADMIN), AdminController.deleteAdmin)
router.patch('/:id', 
  CloudinaryHelper.upload.single('file'),
  auth(AuthUser.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    return AdminController.updateAdmin(req, res, next);
  }
)

export const AdminRoutes = router;