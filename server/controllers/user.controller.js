const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports.register = (req,res,next)=>{
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;
    user.save((err,doc)=>{
      if(!err){
          res.send(doc);
      }else{
          if(err.code = 11000)
            res.status(422).send(['Email already registered.'])
            else return next(err)
      }
    })
}