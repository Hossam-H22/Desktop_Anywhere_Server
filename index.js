
import * as dotenv from 'dotenv'
import express from 'express'
import initApp from './src/app.router.js';
import sendEmail from './src/utils/sendEmail.js';
import { Server, Socket } from 'socket.io';

dotenv.config()
const app = express()
const port = 5000 || process.env.PORT



app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

initApp(app, express)

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
