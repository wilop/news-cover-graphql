
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {roleSchema } from './roleModel.js';

const userSchema = new Schema({
    "email": { type: String, unique: true, dropDups: true, required: true },
    "first_name": { type: String, required: true },
    "last_name": { type: String, required: true },
    "role": { type: roleSchema, required: true }
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    "model": userModel,
    "schema": userSchema
};