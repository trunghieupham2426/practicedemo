import express from 'express';
import { addItemToCart, getUserCart } from '../controller/cart.controller';
import { protectingRoutes } from '../middleware/auth.middleware';
export const router = express.Router();

router.use(protectingRoutes);

router.route('/').get(getUserCart).post(addItemToCart);
