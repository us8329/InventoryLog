require('./config/config')
require('./models/db')
require('./config/passportConfig')

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const rtsIndex = require('./routes/index.router')


const app = express();

app.use(express.urlencoded({extended:false}))
app.use('/uploads' , express.static('uploads'))
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());


app.use('/api%20', rtsIndex);

app.use((err,req,res,next)=>{
    if(err.name === "ValidationError"){
        var valErrors = [];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});



app.listen(process.env.PORT ,() => console.log('app is listening'))