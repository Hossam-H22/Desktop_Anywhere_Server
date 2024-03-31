import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const offerSchema = new Schema({
    ip: {
        type: String,
        required: true,
    },
    sdp: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required: true,
        // default: 'offer',
        enum: ['offer', 'answer'],
    },

}, {
    timestamps: true,
});


const offerModel = mongoose.models.Offer || model('Offer', offerSchema);

export default offerModel;