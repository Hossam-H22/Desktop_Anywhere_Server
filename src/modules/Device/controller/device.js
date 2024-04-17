import { asyncHandler } from './../../../utils/errorHandling.js';
import deviceModel from './../../../../DB/Models/Device.model.js';
import checkAvailability from '../../../../index.js';



export const getAll = asyncHandler(async (req, res, next) => {
    const devices = await deviceModel.find();
    return res.status(200).json({ message: "Done", devices });
})

export const getInformation = asyncHandler(async (req, res, next) => {
    const devices = await deviceModel.find({mac_address: req.body.mac});
    var ready_devices = [];
    devices.forEach(element => {
        ready_devices.push({
            public_ip: element.public_ip,
            private_ip: element.private_ip,
            mac_address: element.mac_address,
            available: checkAvailability(element.public_ip, "desktop")? 1 : 0,
            updatedAt: element.updatedAt,
        })
    });
    return res.status(200).json({ message: "Done", ready_devices });
})

export const get = asyncHandler(async (req, res, next) => {
    const device = await deviceModel.findOne({public_ip: req.params.ip});
    return device ? res.status(200).json({ message: "Done", device }) : next(new Error(`Not Found device with this ip ${req.params.ip}`, { case: 404 }));
})

export const add = asyncHandler(async (req, res, next) => {
    var device = await deviceModel.findOne({mac_address: req.body.mac_address});
    if(device){
        if(device.public_ip != req.body.public_ip || device.private_ip != req.body.private_ip){
            device.public_ip = req.body.public_ip;
            device.private_ip = req.body.private_ip;
            await device.save();
        }
        return device? res.status(200).json({ message: "Done", device }) : next(new Error(`Found Error`, { case: 400 }));
    }
    else {
        device = await deviceModel.create({
            public_ip: req.body.public_ip,
            private_ip: req.body.private_ip,
            mac_address: req.body.mac_address,
        });
        return device? res.status(201).json({ message: "Done", device }) : next(new Error(`Found Error`, { case: 400 }));
    }
    
})

export const deleteOne = asyncHandler(async (req, res, next) => {
    const device = await deviceModel.findByIdAndDelete(req.params.id);
    return device ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found Id: ${req.params.id}`, {cause: 404}));
})

