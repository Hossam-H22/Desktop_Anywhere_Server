import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const userSchema = new Schema({
    ip: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


const userModel = mongoose.models.User || model('User', userSchema);

export default userModel;