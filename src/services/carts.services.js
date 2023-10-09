import cart from '../models/schemas/cart.schema.js';

    const getAll = async () => await cart.find();

    const getCartById = async (id) => await cart.findOne({_id: id});

    // const getCartBySku = async() => await cart.findOne({sku: sku});

    const create = async (info) => await cart.create(info);

    const updateCartById = async (id) => await cart.updateOne({_id: id}, {$set: {status: "finalizado"}});

    const deleteCart = async (id) => await cart.findByIdAndDelete({_id: id});

export {
    getAll,
    getCartById,
    // getCartBySku,
    create,
    updateCartById,
    deleteCart
};