import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const userSchema = new Schema({
    public_ip: {
        type: String,
        required: true,
    },
    private_ip: {
        type: String,
        required: true,
    },
    mac_address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


const userModel = mongoose.models.User || model('User', userSchema);

export default userModel;