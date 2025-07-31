import { Router } from "express";
import * as ctrl from '../controllers/productController.js';

const router = Router();

router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create); 
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.deleteByID);

export default router;