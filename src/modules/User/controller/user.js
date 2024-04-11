import { asyncHandler } from './../../../utils/errorHandling.js';
import userModel from './../../../../DB/Models/User.model.js';
import checkAvailability from '../../../../index.js';



export const getAll = asyncHandler(async (req, res, next) => {
    const users = await userModel.find();
    return res.status(200).json({ message: "Done", users });
})

export const getInformation = asyncHandler(async (req, res, next) => {
    const users = await userModel.find({mac_address: req.body.mac});
    var devices = [];
    users.forEach(element => {
        devices.push({
            public_ip: element.public_ip,
            private_ip: element.private_ip,
            mac_address: element.mac_address,
            availabile: checkAvailability(element.public_ip, "desktop"),
            updatedAt: element.updatedAt,
        })
    });
    return res.status(200).json({ message: "Done", devices });
})

export const get = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({public_ip: req.params.ip});
    return user ? res.status(200).json({ message: "Done", user }) : next(new Error(`Not Found user with this ip ${req.params.ip}`, { case: 404 }));
})

export const add = asyncHandler(async (req, res, next) => {
    var user = await userModel.findOne({mac_address: req.body.mac_address});
    if(user){
        if(user.public_ip != req.body.public_ip || user.private_ip != req.body.private_ip){
            user.public_ip = req.body.public_ip;
            user.private_ip = req.body.private_ip;
            await user.save();
        }
        return user? res.status(200).json({ message: "Done", user }) : next(new Error(`Found Error`, { case: 400 }));
    }
    else {
        user = await userModel.create({
            public_ip: req.body.public_ip,
            private_ip: req.body.private_ip,
            mac_address: req.body.mac_address,
        });
        return user? res.status(201).json({ message: "Done", user }) : next(new Error(`Found Error`, { case: 400 }));
    }
    
})

export const deleteOne = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    return user ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found Id: ${req.params.id}`, {cause: 404}));
})

