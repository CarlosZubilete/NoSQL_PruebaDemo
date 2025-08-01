import { Router } from "express";
import * as ctrl from '../controllers/clientTypeController.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id' , ctrl.getById);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.update);


export default router;