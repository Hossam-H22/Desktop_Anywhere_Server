


import { verifyToken } from '../utils/generateAndVerifyToken.js';
import userModel from './../../DB/Models/User.model.js';
import { asyncHandler } from './../utils/errorHandling.js';


const auth = asyncHandler(async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        return res.json({ message: "In-valid Bearer key" });
    }

    const token = authorization.split(process.env.BEARER_KEY)[1]
    if (!token) {
        return res.json({ message: "Token is required" });
    }

    // Decode Token
    const decoded = verifyToken({ token });

    if (!decoded?.id || !decoded?.isLoggedIn) {
        return res.json({ message: "In-valid token" });
    }

    const authUser = await userModel.findById(decoded.id).select("userName email status role");
    if (!authUser) {
        return res.json({ message: "Not register account" });
    }

    req.user = authUser;
    return next();

})


export default auth;