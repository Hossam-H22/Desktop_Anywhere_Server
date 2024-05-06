
import * as dotenv from 'dotenv'
import express from 'express'
import initApp from './src/app.router.js';
import initSocket from './socket.js';


dotenv.config()
const app = express()
const port = process.env.PORT || 5000

initApp(app, express);

const server = app.listen(port, () => console.log(`app running on port ............... ${port}`));

initSocket(server);

