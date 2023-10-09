import express from 'express';
import { getAllCarts, getCartById, createCart, resolveCart, deleteCart } from '../controllers/cartControllers.js';
const cartRouter = express.Router();

cartRouter.get('/', getAllCarts);

cartRouter.get('/:id', getCartById);

cartRouter.post('/', createCart);

cartRouter.put('/resolveCart/:id', resolveCart);

cartRouter.delete('/deleteCart/:id', deleteCart);

export default cartRouter;