import express, { Request, Response, NextFunction } from 'express';
import App from './services/expressApp';
import database from './services/database';
import { PORT } from './config';


const app = express();
 
const startServer  = async () => {
    const app = express();
    await database();
    await App(app)
    app.listen(PORT, ()=> {
        console.log(`Listening to port ${PORT}`)
    })
};

startServer();