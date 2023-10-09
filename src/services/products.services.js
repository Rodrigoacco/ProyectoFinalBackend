import products from '../models/schemas/products.schema.js';

    const getAll = async () => await products.find();

    const getProductsById = async (id) => await products.findOne({_id: id});

    const create = async (info) => await products.create(info);

    const updateStockProducts = async (id, product) => await products.updateOne({_id: id}, {$set: {stock: product}});

    const updateProducts = async (id, product) => await products.updateOne({_id: id}, {$push: {products: product}});

    const deleteProducts = async (id) => await products.findByIdAndDelete(id);


export {
    getAll,
    create,
    getProductsById,
    updateStockProducts,
    updateProducts,
    deleteProducts
}