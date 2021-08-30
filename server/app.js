require('./config/config')
require('./models/db')
require('./config/passportConfig')

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const rtsIndex = require('./routes/index.router')


const app = express();

app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());



app.use('/api%20', rtsIndex);





app.listen(process.env.PORT ,() => console.log('app is listening'))


// require('./config/config')
// require('./models/db')
// require('./config/passportConfig')
// const path = require("path");
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const postsRoutes = require("./routes/index.router");

// const app = express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/uploads", express.static(path.join("server/uploads")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

// app.use("/api/posts", postsRoutes);

// module.exports = app;
