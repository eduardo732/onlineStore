import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

router.get('/product/findAll', productController.findAll);

export default router;