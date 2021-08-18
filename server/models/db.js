const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify: false,
}).then(()=>{
    console.log('connection with mongoDB successfull');
}).catch((e)=>{
    console.log('connection failed');
})

require('./user.model'); 