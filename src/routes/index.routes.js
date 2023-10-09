import express from 'express';
import productsRouter from './products.routes.js';
import userRouter from './user.routes.js';
import cartRouter from './cart.routes.js';
import sessionRouter from './session.routes.js';
const indexRouter = express.Router();

indexRouter.use('/v1/api/user', userRouter);
indexRouter.use('/v1/api/products', productsRouter);
indexRouter.use('/v1/api/cart', cartRouter);
indexRouter.use('/v1/api/session', sessionRouter);

export default indexRouter;