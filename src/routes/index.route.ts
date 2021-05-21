import { Router } from 'express';
import * as index from '../controllers/index.controller';

const router = Router();

router.get('/', index.indexWelcome);

export default router;