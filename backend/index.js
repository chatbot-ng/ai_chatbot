 require("dotenv").config();

const express = require ('express');
const cors = require ('cors');
const morgan = require ('morgan');
const path = require ('path');
const session = require('express-session')

const connectDatabase = require('./database/connectDatabase');
const authRouter  = require('./routes/auth');
const chatRouter = require("./routes/chat");
const app = express();


app.use(express.json());
app.use(session({
    secret: 'ajksdhajdha',
    resave: false,
    saveUninitialized: false,
    })
)
app.use(cors());
app.use(morgan('common'));


app.get('/hello', (req, res) => {
    if(req.session.counter === undefined ){
        req.session.counter = 0
    }else{
        req.session.counter++
    }
        res.send(`Hello there ${req.session.counter} times ${typeof req.session.counter}`)

})

app.use('/api/auth', authRouter);
app.use('/api/chat',chatRouter);
app.use('/', express.static('../frontend/dist'));

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