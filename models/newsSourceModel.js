import mongoose from'mongoose';
const Schema = mongoose.Schema;

import {categorySchema} from './categoryModel.js';
import {roleSchema} from './roleModel.js';

export const newsSourceSchema = new Schema({
    "url": { type: String, required: true },
    "name": { type: String, required: true },
    "category": { type: categorySchema, required: true },
    "user": {
        "_id": { type: mongoose.Types.ObjectId, require: true },
        "email": { type: String, required: true },
        "first_name": { type: String, required: true },
        "last_name": { type: String, required: true },
        "role": { type: roleSchema, required: true }
    },
});

export const newsSourceModel = mongoose.model('NewsSource', newsSourceSchema);
