
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const roleSchema = new Schema({
    "name": { type: String, required: true },
    // "role_level": { type: Number, required: true }
});

export const roleModel = mongoose.model('Role', roleSchema);

