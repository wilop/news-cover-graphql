import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const categorySchema = new Schema({
    "name": { type: String, required: true },
});

export const categoryModel = mongoose.model('Category', categorySchema);
