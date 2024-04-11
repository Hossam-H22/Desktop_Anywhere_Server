import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const deviceSchema = new Schema({
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


const deviceModel = mongoose.models.Device || model('Device', deviceSchema);

export default deviceModel;