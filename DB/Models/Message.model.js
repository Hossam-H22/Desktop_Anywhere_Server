import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose'

const messageSchema = new Schema({

    message: {
        type: String,
        required: true,
    },
    receiverId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    

}, {
    timestamps: true,
});


const messageModel = mongoose.models.Message || model('Message', messageSchema);

export default messageModel;