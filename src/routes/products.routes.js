import express from 'express';
import { getAllProducts, 
        getProductsById, 
        insertProducts, 
        addProducts ,
        deleteProducts } from '../controllers/productsControllers.js';
const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductsById);

productsRouter.post('/', insertProducts);

productsRouter.put('/:id', addProducts);

productsRouter.delete('/:id', deleteProducts);

export default productsRouter;