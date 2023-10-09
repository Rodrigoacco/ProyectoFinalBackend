import * as cartService from '../services/carts.services.js';
import * as userService from '../services/users.services.js';
import * as productsService from '../services/products.services.js';
import log from '../config/logger.js';
import products from '../models/schemas/products.schema.js';

const getAllCarts = async (req, res) => {
    try {
        const result = await cartService.getAll();
        res.status(200).send(result);
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

const getCartById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await cartService.getCartById(id);
        res.status(200).send(result);
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

const createCart = async (req, res) =>{
    const {userId, productsId, product} = req.body;
    const resultProducts = await productsService.getProductsById(productsId);
    try {
        let actualCarts = Object.values(resultProducts).filter(pr =>pr.title && pr.title.includes(product));
        if (!actualCarts) {
            return res.status(400).send("Algun producto no corresponde con el stock");
        }
        const sum = actualCarts.reduce((acc, prev) => {
            acc += prev.price;
            return acc;
        }, 0);
        const cartNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
        let newCart = {
            nombre: cartNumber,
            productsId,
            userId,
            status: "Pendiente",
            products: actualCarts.map(pr => pr.title),
            stock: actualCarts.map(pr => pr.stock),
            totalPrice: sum
        };
        log.info(newCart);
        const cartResult = await cartService.create(newCart);
        await userService.updateCartByUserId(userId, cartResult.id);
        res.status(200).send({status: "Sastifactorio", cartResult});
    } catch (e) {
        log.error("Error - Crear orden", e);
        res.status(500).send("Error al crear la orden");
    }
};

const resolveCart = async (req, res) => {
    const {id} = req.params;
    try {
        const resultCart = await cartService.getCartById(id);
        const stockProducts = await productsService.getProductsById(resultCart.productsId);
        stockProducts.stock -=1;
        console.log(stockProducts.stock);
        await productsService.updateStockProducts(stockProducts.id, stockProducts.stock);
        await cartService.updateCartById(id);
        res.status(200).send({status: "Sastifactorio", result: "Orden resuleta"});
    } catch (e) {
        log.error("Error - Crear orden", e);
        res.status(500).send("Error al crear la orden");
    }
}

const deleteCart = async (req, res) => {
    try{
        const cart = await cartService.deleteCart(req.params.id);
        res.json(cart)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

export {
    getAllCarts,
    getCartById,
    createCart,
    resolveCart,
    deleteCart
}