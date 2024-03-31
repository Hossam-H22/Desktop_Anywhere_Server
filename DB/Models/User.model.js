import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const userSchema = new Schema({

    firstName: String,
    lastName: String,
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        default: 'male',
        enum: ['male', 'female'],
    },
    age: Number,
    phone: String,
    profilePic: String,
    profilePicId: String,
    coverPic: [],
    address: String,
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online', 'blocked'],
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin'],
    },


}, {
    timestamps: true,
});


const userModel = mongoose.models.User || model('User', userSchema);

export default userModel;