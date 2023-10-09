import * as productsServices from '../services/products.services.js';
import log from '../config/logger.js';

const getAllProducts = async (req, res) => {
    try {
        const result = await productsServices.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

const getProductsById = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send("¡Id es obligatorio!");
    }
    try {
        const result = await productsServices.getProductsById(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const insertProducts = async (req, res) => {
    try {
        const result = await productsServices.create(req.body);
        res.status(200).send(result);
    } catch (e) {
        log.error(e);
        res.status(500).send(result);
    }
}

const addProducts = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).send("¡Id es obligatorio!");
    }
    try {
        const product = re.body;
        const result = await productsServices.updateProducts(id, product);
        res.status(200).send(result);
    } catch (e) {
        log.error(e);
        res.status(500).send("Fallo actualizacion");
    }
}

const deleteProducts = async (req, res) => {
    try {
        const product = await productsServices.deleteProducts(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getAllProducts,
    getProductsById,
    insertProducts,
    addProducts,
    deleteProducts
}