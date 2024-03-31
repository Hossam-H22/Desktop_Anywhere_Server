
import candidateModel from './../../../../DB/Models/Candidate.model.js';
import { asyncHandler } from './../../../utils/errorHandling.js';





export const getCandidateModule = asyncHandler(async (req, res, next) => {
    return res.json({ message: "Candidate Module" });
})


export const getCallee = asyncHandler(async (req, res, next) => {
    // const callee = await candidateModel.find({ 'ip': req.params.ip, 'kind': 'callee' });
    const callee = await candidateModel.findOne({ 'ip': req.params.ip, 'kind': 'callee' });
    // console.log({ message: "Done getting callee", callee });
    return callee ? res.status(200).json({ message: "Done", callee }) : next(new Error(`Not Found callee for this ip ${req.params.ip}`, { case: 404 }));
})

export const getCaller = asyncHandler(async (req, res, next) => {
    const caller = await candidateModel.findOne({ 'ip': req.params.ip, 'kind': 'caller' });
    // console.log({ message: "Done getting caller", caller });
    return caller ? res.status(200).json({ message: "Done", caller }) : next(new Error(`Not Found callee for this ip ${req.params.ip}`, { case: 404 }));
})

export const addCallee = asyncHandler(async (req, res, next) => {
    const {candidate, sdpMid, sdpMLineIndex} = req.body;
    var callee = await candidateModel.findOne({ 'ip': req.params.ip, 'kind': 'callee' });
    if(callee){
        callee.candidate = candidate;
        callee.sdpMid = sdpMid;
        callee.sdpMLineIndex = sdpMLineIndex;
        await callee.save();
    }else {
        callee = await candidateModel.create({
            'ip': eq.params.ip,
            candidate,
            sdpMid,
            sdpMLineIndex,
            'kind': 'callee',
        });
    }
    // console.log({ message: "Done creating callee", callee });
    return caller ? res.status(200).json({ message: "Done", callee }) : next(new Error(`Found Error`, { case: 404 }));
})

export const addCaller = asyncHandler(async (req, res, next) => {
    const {candidate, sdpMid, sdpMLineIndex} = req.body;
    var caller = await candidateModel.findOne({ 'ip': req.params.ip, 'kind': 'caller' });

    if(caller){
        caller.candidate = candidate;
        caller.sdpMid = sdpMid;
        caller.sdpMLineIndex = sdpMLineIndex;
        await caller.save();
    }else {
        caller = await candidateModel.create({
            'ip': req.params.ip,
            candidate,
            sdpMid,
            sdpMLineIndex,
            'kind': 'caller',
        });
    }
    // console.log({ message: "Done creating caller", caller });
    return caller ? res.status(200).json({ message: "Done", caller }) : next(new Error(`Found Error`, { case: 404 }));
})

export const deleteCallee = asyncHandler(async (req, res, next) => {
    const callee = await candidateModel.deleteOne({ 'ip': req.params.ip, 'kind': 'callee' });
    return callee.deletedCount ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found IP: ${req.params.ip}`, {cause: 404}));
})

export const deleteCaller = asyncHandler(async (req, res, next) => {
    const caller = await candidateModel.deleteOne({ 'ip': req.params.ip, 'kind': 'caller' });
    return caller.deletedCount ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found IP: ${req.params.ip}`, {cause: 404}));
})


