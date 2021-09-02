const express= require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const path = require('path')
const passport = require('passport')
const Product = require('../models/products.model')
const User = require('../models/user.model')
// const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper')
const {Products} = require('../models/products.model')

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads');
    },
    filename: (req,file,cb)=>{
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, new Date().toISOString() + fileName);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    'productImage'
  );

const users= User;
const ctrlUser = require('../controllers/user.controller')
const ctrlProduct = require('../controllers/products.controller')

router.post('/register' , ctrlUser.register)
router.post('/authenticate'  ,ctrlUser.authenticate)
// router.get('/user', authenticateToken, ctrlUser.userProfile)
router.get('/userprofile' , authenticateToken, ctrlUser.userProfile)

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token =authHeader&&  authHeader.split(' ')[1]
  if(token==null) 
    return res.sendStatus(401)

  jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET , (err,user)=>{
    if(err)
      return res.sendStatus(403)
    req.user = user;
    next();
  })
 }


router.post('/add' , upload ,ctrlProduct.add)

router.get('/display' , ctrlProduct.display)
// router.get('/edit/:id',ctrlProduct.currentproduct )
router.put('/:id' ,upload , ctrlProduct.update)

router.delete('/:id' , ctrlProduct.delete)
module.exports = router;
 

// router.post('/add', ctrlProduct.add)



// router.post('/add' , upload , async (req,res,next)=>{

//     // console.log(req.file.filename)
//     try{
//     // const imagePath = 'http://localhost:4000/uploads/'+ req.file.filename;
//     const imagePath = null;

//     const product = new Product({
//         productName: req.body.productName,
//         productType: req.body.productType,
//         availibilityDate: req.body.availibilityDate,
//         price : req.body.price,
//         // productImage = 'http://localhost:4000/uploads/'+ req.file.filename
//         productImage :imagePath
//       });
//       const obsolete = await product.save((err,doc)=>{
//         if(!err){
//             res.send(doc);
//         }else{
//             console.log(err)
//             if(err.code = 11000)
//               res.status(422).send(['product cannot be added'])
//               else return next(err)
//         }
//       })
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// })

// router.post('/add' ,upload , (req,res)=>{

//     console.log(req.body);
//     const url = req.protocol + "://" + req.get("host");

//     var product = new Product();
//     product.productName = req.body.productName;
//     product.productType = req.body.productType;
//     product.availibilityDate = req.body.availibilityDate;
//     product.price = req.body.price;
//     // product.productImage = url + "/uploads/"+ req.file.filename;
//     product.save((err,doc)=>{
//         if(!err){
//             res.send(doc);
//         }else{
//             console.log(err)
//             if(err.code = 11000)
//               res.status(422).send(['product cannot be added'])
//               else return next(err)
//         }
//       })
// } )



// const express = require("express");
// const multer = require("multer");

// const Post = require("../models/products.model");

// const router = express.Router();

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const ctrlUser = require('../controllers/user.controller')
// router.post('/register' , ctrlUser.register)
// router.post('/authenticate' , ctrlUser.authenticate)
// router.get('/userprofile' , jwtHelper.verifyJwtToken , ctrlUser.userProfile)

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });

// router.post("",multer({ storage: storage }).single("image"),(req, res, next) => {
  
//     const url = req.protocol + "://" + req.get("host");
//     const post = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: url + "/images/" + req.file.filename
//     });
//     post.save().then(createdPost => {
//       res.status(201).json({
//         message: "Post added successfully",
//         post: {
//           ...createdPost,
//           id: createdPost._id
//         }
//       });
//     });
//   }
// );

// router.put(
//   "/:id",
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename
//     }
//     const post = new Post({
//       _id: req.body.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: imagePath
//     });
//     console.log(post);
//     Post.updateOne({ _id: req.params.id }, post).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );

// router.get("", (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

// module.exports = router;
