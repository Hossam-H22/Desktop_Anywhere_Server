import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const candidateSchema = new Schema({

    ip: {
        type: String,
        required: true,
    },
    candidate: {
        type: String,
        required: true,
    },
    sdpMid: {
        type: String,
        required: true,
    },
    sdpMLineIndex: {
        type: Number,
        required: true,
    },
    kind: {
        type: String,
        required: true,
        // default: 'caller',
        enum: ['caller', 'callee'],
    },

}, {
    timestamps: true,
});


const candidateModel = mongoose.models.Candidate || model('Candidate', candidateSchema);

export default candidateModel;