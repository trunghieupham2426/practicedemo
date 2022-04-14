import express from 'express';
import { checkOut } from '../controller/order.controller';
import { protectingRoutes } from '../middleware/auth.middleware';

export const router = express.Router();

router.use(protectingRoutes);
router.get('/test', checkOut);
