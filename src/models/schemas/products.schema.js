import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean,  default: true, required: true},
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: {type: Array }
});

productsSchema.plugin(mongoosePaginate);

const products = new mongoose.model(productsCollection, productsSchema);

export default products;