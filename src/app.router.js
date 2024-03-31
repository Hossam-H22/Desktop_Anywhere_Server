


import candidateRouter from "./modules/Candidate/candidate.router.js"
import offerRouter from "./modules/Offer/offer.router.js"
import connectDB from './../DB/connection.js';
import { globalErrorHandling } from "./utils/errorHandling.js";
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const initApp = (app, express) => {

    // convert Buffer Data
    app.use(express.json({}));

    app.use(cors())

    // App Routing

    app.get('/welcome', (req, res)=> res.send("Welcome to Desktop Anywhere Server"));
    app.use("/candidate", candidateRouter);
    app.use("/connection", offerRouter);
    app.all("*", (req, res, next)=>{
        return res.json({message: "In-valid routing"});
    }); 

    // Error handling middleware
    app.use(globalErrorHandling);

    // Connection DB
    connectDB();
}

export default initApp