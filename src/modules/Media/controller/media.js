import { asyncHandler } from './../../../utils/errorHandling.js';
import mediaModel from './../../../../DB/Models/Media.model.js';
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'


export const getAll = asyncHandler(async (req, res, next) => {
    const files = await mediaModel.find();
    return res.status(200).json({ message: "Done", files });
})

export const getOne = asyncHandler(async (req, res, next) => {
    const mobile_Id = req.params.mobile_Id;
    const file = await mediaModel.findOne({ createdBy: mobile_Id });
    return file ? res.status(200).json({ message: "Done", file }): next(new Error(`In-valid or Not Found Id or No files for this Id: ${mobile_Id} `, {cause: 404}));
})



export const add = asyncHandler(async (req, res, next) => {
    const mobile_Id = req.body.mobile_Id
    var media = await mediaModel.find({ createdBy: mobile_Id });
    if(media.length > 0){
        media.forEach(element => {
            deleteFile(element.secure_url);
        });
        await mediaModel.deleteMany({ createdBy: mobile_Id });
    }
    
    media = await mediaModel.create({
        secure_url: req.file.dest,
        file_name: req.file.originalname,
        createdBy: mobile_Id,
    });

    return res.status(201).json({ message: "Done", media });    
})



export const deleteOne = asyncHandler(async (req, res, next) => {
    const mobile_Id = req.params.mobile_Id
    var media = await mediaModel.find({ createdBy: mobile_Id });
    media.forEach(element => {
        deleteFile(element.secure_url);
    });
    media = await mediaModel.deleteMany({ createdBy: mobile_Id });

    return media.deletedCount>0 ? res.status(200).json({ message: "Done"}) 
    : next(new Error(`In-valid or Not Found Id or No files for this Id: ${req.params.mobile_Id} `, {cause: 404}));
})


export function deleteFile(url){
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const fullPath = path.join(__dirname, `./../../../${url}`)
    fs.unlinkSync(fullPath);
}