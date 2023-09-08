import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import {connectDatabase} from './database/connectDatabase';
import authRouter from './routes/auth';
// import deptRouter from './routes/department.js';

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('common'));

app.get('/hello', (req, res, next) => {

    res.send('Hello there')

    next();
})

app.use('/api/auth', authRouter);
// app.use('/api/department',deptRouter);
app.use('/', express.static('../frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
        return
    })
})