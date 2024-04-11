
import * as dotenv from 'dotenv'
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors'
import { asyncHandler, globalErrorHandling } from "./src/utils/errorHandling.js";
import candidateRouter from "./src/modules/Candidate/candidate.router.js"
import offerRouter from "./src/modules/Offer/offer.router.js"
import stunRouter from "./src/modules/Stun/stun.router.js"
import trunRouter from "./src/modules/Turn/turn.router.js"
import userRouter from "./src/modules/User/user.router.js"
import connectDB from './DB/connection.js';
import turnModel from './DB/Models/Turn.model.js';
import stunModel from './DB/Models/Stun.model.js';


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

app.get('/welcome', (req, res)=> res.status(200).json({message: "Welcome to Desktop Anywhere Server"}));
app.use("/candidate", candidateRouter);
app.use("/connection", offerRouter);
app.use("/stun", stunRouter);
app.use("/turn", trunRouter);
app.use("/user", userRouter);
app.get("/confegration", asyncHandler(async (req, res, next) => {
    const stun = await stunModel.find();
    var newStun=[]
    stun?.forEach(element => newStun.push(element.url));

    const turn = await turnModel.find();
    var newTurn=[]
    turn?.forEach(element => 
        newTurn.push({
            "urls": element.url,
            "username": element.username,
            "credential": element.credential,
        })
    )
    var configuration = {
        "iceServers": [
            {
                'urls': newStun
            },
            ...newTurn,
        ]
    }
    return res.status(200).json({ message: "Done", configuration })
}));
app.all("*", (req, res, next)=>{
    return res.status(404).json({message: "In-valid routing"});
}); 

// Error handling middleware
app.use(globalErrorHandling);

// Connection DB
connectDB();


const server = app.listen(port, () => console.log(`app running on port ............... ${port}`));



function checkAvailability(ip, type){
    var found = false;
    devices.forEach(device => {
        if(device['ip'] == ip && device['type'] == type){
            found = true;
        }
    });
    return found
}

var devices = [];

const io = new Server(server, {
    cors: '*'
});

io.on("connection", (socket)=> {
    // console.log(socket.id);


    // socket.emit("event", {
    //     "ip": "192.168.1.9", // 
    //     "type": "", // mobile or desktop or web
    //     "target_type": "", // mobile or desktop or web
    //     "event": "home", // target event
    //     "message":{
    //         "":"",
    //     },
    //     "eventError": "error", // error event if target not found
    //     "messageError": {
    //         "":"",
    //     },
    // })


    socket.on("event", (data)=>{
        const { event, message } = data;
        console.log(`event => ${event}`);
        var found = false

        devices.forEach(receiver => {
            if(receiver['ip'] == data['ip'] && receiver['type'] == data['target_type']){
                found = true;
                io.to(receiver.id).emit(event, message);
            }
        });

        if(found==false)
            socket.emit(data["eventError"], data["messageError"])
    })

    socket.on("checkAvailableDevice", (data)=>{
        var found = checkAvailability(data['ip'], data['target_type']);
        socket.emit("checkIPResult", {
            "message": found? "found" : "Please check the IP",
            "found": found,
        });
    });

    socket.on("addDevice", (data)=>{
        console.log("addDevice");
        const newDevices = devices.filter(device => {
            return !(device['ip'] == data['ip'] && device['type'] == data['type']);
            // return !( device['ip'] == data['ip'] && device['type'] == data['type'] && (data['type'] == "desktop" || data['type'] == "web") );
            // return !(device['id'] == socket.id);
        });
        devices = newDevices;
        devices.push({
            id: socket.id,
            ...data,
        });
        console.log(devices);
    });
    
    socket.on("disconnect", () => {
        console.log("disconnect");
        const newDevices = devices.filter(device => {
            return device['id'] != socket.id;
        });
        devices = newDevices;
        console.log(devices);
    });

    socket.on("getStunAndTurn", async ()=>{
        const stun = await stunModel.find();
        var newStun=[]
        stun?.forEach(element => {
            newStun.push(element.url);
        });

        const turn = await turnModel.find();
        var newTurn=[]
        turn?.forEach(element => {
            newTurn.push({
                "urls": element.url,
                "username": element.username,
                "credential": element.credential,
            });
        });
        var configuration = {
            "iceServers": [
                {
                    'urls': newStun
                },
                ...newTurn,
            ]
        }

        socket.emit("receiveStunAndTurn", configuration);
    });

});


export default checkAvailability;