const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const passport = require('passport')
const _ = require('lodash')
const { ok } = require('assert')

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

module.exports.authenticate = (req,res,next)=>{
  passport.authenticate('local' , (err,user,info)=>{
    if(err)
      return res.status(400).json(err);
    else if(user) {
      const accessToken = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET)
      res.json({jwt : accessToken})
      // return res.status(200).send({ "jwt" : user.generateJwt()});
    }
    else 
      return res.status(404).json(info) 
  })(req,res);

}

module.exports.userProfile = (req,res,next)=>{
  res.json({User})
  // res.send(accessToken);
  // User.findOne({_id:req._id},
  //   (err,user)=>{
  //     if(err)
  //     if(!user)
  //       return res.status(400).json({ status:false , message:"User record not found "});
  //     else
  //       return res.status(200).json({status:true , user: _.pick(user,['username' , 'email'])})
  //   })
}

