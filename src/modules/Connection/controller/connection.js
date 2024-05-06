
import mobileModel from '../../../../DB/Models/Mobile.model.js';
import connectionModel from './../../../../DB/Models/Connection.model.js';
import { asyncHandler } from './../../../utils/errorHandling.js';



export const getAll = asyncHandler(async (req, res, next) => {
    const connections = await connectionModel.find();
    return res.status(200).json({ message: "Done", connections });
})


export const getDesktopConnections = asyncHandler(async (req, res, next) => {
    const mobiles = await connectionModel.find({ 'desktop_mac': req.params.desktop_mac });
    var mobileIds = [];
    mobiles.forEach(element => {
        mobileIds.push(element.mobile_id);
    });
    const mobilesData = await mobileModel.find({ '_id': mobileIds });
    return res.status(200).json({ message: "Done", mobiles: mobilesData });
})


export const getMobileConnections = asyncHandler(async (req, res, next) => {
    const desktops = await connectionModel.find({ 'mobile_id': req.params.mobile_id });
    return res.status(200).json({ message: "Done", desktops });
})


export const addConnection = asyncHandler(async (req, res, next) => {
    const { desktop_mac, mobile_id } = req.body;
    var connection = await connectionModel.create({ 'desktop_mac': desktop_mac, 'mobile_id': mobile_id, });
    if(connection){
        return res.status(200).json({ message: "Done", connection });
    }else {
        connection = await connectionModel.create({
            'desktop_mac': desktop_mac,
            'mobile_id': mobile_id,
        });
    }
    return connection? res.status(200).json({ message: "Done", connection }) : next(new Error(`Found Error`, { case: 404 }));
})


export const deleteConnection = asyncHandler(async (req, res, next) => {
    const connection = await connectionModel.deleteOne({ '_id': req.params.id });
    return connection.deletedCount ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found ID: ${req.params.id}`, {cause: 404}));
})


