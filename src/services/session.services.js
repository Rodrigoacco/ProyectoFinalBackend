import users from '../models/schemas/user.schema.js';

const find = async () => await users.findOne({ email });

export {
    find,
}