import express from "express";
import { connectDB } from "./database.js";
import memory from "./routes/memory.routes.js";
import http from "http";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import bodyParser from "body-parser";
const app = express();

//Settings 
app.set('port', process.env.PORT || 3001)
const server = http.createServer(app);

//Middlewares
app.use(morgan('dev'));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
//Routes

app.use('/memory', memory);

//Static files

server.listen(3001, () => {
    connectDB();
    console.log(`Server on port ${app.get('port')}`);
})
