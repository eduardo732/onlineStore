import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';

const router = Router();

router.get('/category/findAll', categoryController.findAll);
router.get('/category/products', categoryController.getProductsFromCategory);

export default router;