
import * as dotenv from 'dotenv'
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors'
import candidateRouter from "./src/modules/Candidate/candidate.router.js"
import offerRouter from "./src/modules/Offer/offer.router.js"
import connectDB from './DB/connection.js';
import { globalErrorHandling } from "./src/utils/errorHandling.js";


dotenv.config()
const app = express()
const port = process.env.PORT || 5000


// convert Buffer Data
app.use(express.json({}));

app.use(cors())

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

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


const server = app.listen(port, () => console.log(`app running on port ............... ${port}`));





var devises = [];

const io = new Server(server, {
    cors: '*'
});

io.on("connection", (socket)=> {
    // console.log(socket.id);

    socket.on("event", (data)=>{

        const { event, message } = data;
        devises.forEach(sender => {
            if(sender['id']==socket.id){

                devises.forEach(receiver => {
                    if(receiver['ip'] == sender['ip'] && receiver['type'] != data['type']){
                        io.to(receiver.id).emit(event, message);
                    }
                });

            }
        });

    })


    socket.on("addDevice", (data)=>{
        const newDevises = devises.filter(devise => {
            return !(devise['ip'] == data['ip'] && devise['type'] == data['type']);
        });
        devises = newDevises;
        devises.push({
            id: socket.id,
            ...data,
        });
        console.log(devises);
    });

    
    socket.on("disconnect", () => {
        const newDevises = devises.filter(devise => {
            return devise['id'] != socket.id;
        });
        devises = newDevises;
        console.log(devises);
    });


});
