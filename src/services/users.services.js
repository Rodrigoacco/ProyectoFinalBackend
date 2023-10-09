import users from '../models/schemas/user.schema.js';

    const getAll = async () => await users.find();

    const getUserById = async (id) => await users.findOne({_id: id});

    const getUserByEmail = async (email) => await users.findOne({correo: email});

    const create = async (info) => await users.create(info);

    const updateUserById = async (id, info) => await users.updateOne({_id: id}, {$ser: info});

    const updatePasswordByEmail = async (email, hashedPassword) => await users.updateOne({correo: email}, {$set: {password: hashedPassword}});

    const updateCartByUserId = async (id, cartId) => await users.updateOne({_id: id}, {$push: {carts: cartId}});

    const deleteUser = async (id) => await users.deleteOne({_id: id});


export {
    getAll,
    getUserById,
    create,
    updateUserById,
    updateCartByUserId,
    deleteUser,
    getUserByEmail,
    updatePasswordByEmail
}