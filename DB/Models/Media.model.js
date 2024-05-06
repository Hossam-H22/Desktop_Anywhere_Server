import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose'

const mediaSchema = new Schema({
    file: { 
        type: Object, 
        required: true, 
    },
    createdBy: { 
        type: Types.ObjectId, 
        ref:'Mobile', 
        required: true, 
    },
}, {
    timestamps: true,
});


const mediaModel = mongoose.models.Media || model('Media', mediaSchema);

export default mediaModel;