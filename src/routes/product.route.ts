import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

router.get('/product/findAll', productController.findAll);
router.post('/product/searcher', productController.searcher);

export default router;