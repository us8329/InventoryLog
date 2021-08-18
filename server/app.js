require('./config/config')
require('./models/db')

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const rtsIndex = require('./routes/index.router')


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', rtsIndex);

app.use((err,req,res,next)=>{
    if(err.name === "ValidationError"){
        var valErrors = [];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});



app.listen(process.env.PORT ,() => console.log('app is listening'))