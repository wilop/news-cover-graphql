import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { newsSourceSchema } from './newsSourceModel.js';
import { categorySchema } from './categoryModel.js';
import { roleSchema } from './roleModel.js';

export const newsSchema = new Schema({
    "title": { type: String, required: true },
    "short_description": { type: String, required: true },
    "permalink": { type: String, required: true },
    "date": { type: String, required: true },
    "image": { type: String },
    "news_source": { type: newsSourceSchema, required: true },
    "user": {
        "_id": { type: mongoose.Types.ObjectId, require: true },
        "email": { type: String, required: true },
        "first_name": { type: String, required: true },
        "last_name": { type: String, required: true },
        "role": { type: roleSchema, required: true }
    },
    "category": { type: categorySchema, required: true },
    "tags": { type: Array, required: false }
});

export const newsModel = mongoose.model('News', newsSchema);
