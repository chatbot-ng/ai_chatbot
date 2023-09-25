import "dotenv/config.js";
import path from 'path';
import { fileURLToPath } from 'url';
import express, { json,static as static_ } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { join } from 'path';
import session from 'express-session';

import connectDatabase from './database/connectDatabase.js';
import authRouter from './routes/auth.js';
import chatRouter from "./routes/chat.js";
import { FRONTEND_URL } from "./config/config.js";
const app = express();
// import { loadPDF } from './langChain/index.js';

app.use(morgan('common'));
app.use(json());
app.use(session({
    secret: 'ajksdhajdha',
    resave: false,
    saveUninitialized: true,
    })
)
app.use(cors({
    origin: FRONTEND_URL,
    credentials:true
}));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get('/hello', (req, res) => {
        req.session.counter++
        res.send(`Hello there ${req.session.counter} times ${typeof req.session.counter}`)
})

app.use('/api/auth', authRouter);
app.use('/api/chat',chatRouter);

app.use('/', static_('../frontend/dist'));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist/index.html'));
})

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
        return
    })
})