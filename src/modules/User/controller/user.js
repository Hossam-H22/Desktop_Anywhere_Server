import { asyncHandler } from './../../../utils/errorHandling.js';
import userModel from './../../../../DB/Models/User.model.js';



export const getAll = asyncHandler(async (req, res, next) => {
    const users = await userModel.find();
    return res.status(200).json({ message: "Done", users });
})

export const get = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({ip: req.params.ip});
    return user ? res.status(200).json({ message: "Done", user }) : next(new Error(`Not Found user with this ip ${req.params.ip}`, { case: 404 }));
})

export const add = asyncHandler(async (req, res, next) => {
    var user = await userModel.findOne({username: req.body.username});
    if(user){
        if(user.ip != req.body.ip){
            user.ip = req.body.ip;
            await user.save();
        }
    }
    else {
        user = await userModel.create({
            ip: req.body.ip,
            username: req.body.username,
        });
    }
    return user? res.status(201).json({ message: "Done", user }) : next(new Error(`Found Error`, { case: 400 }));
})

export const deleteOne = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    return user ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found Id: ${req.params.id}`, {cause: 404}));
})

