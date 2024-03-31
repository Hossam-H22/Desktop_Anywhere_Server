
import offerModel from './../../../../DB/Models/Offer.model.js';
import { asyncHandler } from './../../../utils/errorHandling.js';



export const getOfferModule = asyncHandler(async (req, res, next) => {
    return res.json({ message: "Offer Module" });
})



export const getOffer = asyncHandler(async (req, res, next) => {
    // const offer = await offerModel.find({ 'ip': req.params.ip, 'kind': 'offer' });
    const offer = await offerModel.findOne({ 'ip': req.params.ip, 'kind': 'offer' });
    // console.log({ message: "Done getting offer", offer });
    return offer ? res.status(200).json({ message: "Done", offer }) : next(new Error(`Not Found Offer for this ip ${req.params.ip}`, { case: 404 }));
})

export const getAnswer = asyncHandler(async (req, res, next) => {
    const answer = await offerModel.findOne({ 'ip': req.params.ip, 'kind': 'answer' });
    // console.log({ message: "Done getting answer", answer });
    return answer ? res.status(200).json({ message: "Done", answer }) : next(new Error(`Not Found Answer for this ip ${req.params.ip}`, { case: 404 }));
})

export const addOffer = asyncHandler(async (req, res, next) => {
    console.log("wellcome ");
    const { sdp, type } = req.body;
    var offer = await offerModel.findOne({ 'ip': req.params.ip, 'kind': 'offer' });
    if(offer){
        offer.sdp = sdp;
        offer.type = type;
        await offer.save();
    }else {
        offer = await offerModel.create({
            'ip': req.params.ip,
            sdp,
            type,
            'kind': 'offer',
        });
    }

    // console.log({ message: "Done creating offer", offer });
    return offer ? res.status(200).json({ message: "Done", offer }) : next(new Error(`Found Error`, { case: 404 }));
})

export const addAnswer = asyncHandler(async (req, res, next) => {
    const {sdp, type} = req.body;
    var answer = await offerModel.findOne({ 'ip': req.params.ip, 'kind': 'answer' });
    if(answer){
        answer.sdp = sdp;
        answer.type = type;
        await answer.save();
    }else {
        answer = await offerModel.create({
            'ip': eq.params.ip,
            sdp,
            type,
            'kind': 'answer',
        });
    }
    // console.log({ message: "Done creating answer", answer });
    return answer ? res.status(200).json({ message: "Done", answer }) : next(new Error(`Found Error`, { case: 404 }));
})

export const deleteOffer = asyncHandler(async (req, res, next) => {
    const offer = await offerModel.deleteOne({ 'ip': req.params.ip, 'kind': 'offer' });
    return offer.deletedCount ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found IP: ${req.params.ip}`, {cause: 404}));
})

export const deleteAnswer = asyncHandler(async (req, res, next) => {
    const answer = await offerModel.deleteOne({ 'ip': req.params.ip, 'kind': 'answer' });
    return answer.deletedCount ? res.status(200).json({ message: "Done"}) 
                    : next(new Error(`In-valid or Not Found IP: ${req.params.ip}`, {cause: 404}));
})

