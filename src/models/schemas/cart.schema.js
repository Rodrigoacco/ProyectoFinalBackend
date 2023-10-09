import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const cartCollection = 'Carts';

const cartSchema = new mongoose.Schema({
    number: {type: Number},
    productsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: {type: Array},
    stock: {type: Array},
    totalPrice: {type: Number},
    status: {type: String}
});

cartSchema.pre('findOne', function() {
    this.populate('products.product');
})

cartSchema.plugin(mongoosePaginate);

const cart = new mongoose.model(cartCollection, cartSchema);

export default cart;