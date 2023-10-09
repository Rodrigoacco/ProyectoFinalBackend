import mongoose from 'mongoose';
const usersCollection = 'Users';

const usersSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: false },
    rol: { type: String, required: true, default: 'user'},
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    }]
});

const users = new mongoose.model(usersCollection, usersSchema);

export default users;