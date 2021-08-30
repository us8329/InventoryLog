  const mongoose = require('mongoose')
const Product = require('../models/products.model')
const multer = require('multer');
const ObjectId = require('mongoose').Types.ObjectId;

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'./uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const upload = multer({storage: storage }).single('productImage');



module.exports.add = async(req,res)=>{
    const imagePath = 'http://localhost:4000/uploads/' + req.file.filename;
    const product = new Product({
        productName : req.body.productName , 
        productType : req.body.productType , 
        availibilityDate : req.body.availibilityDate , 
        price : req.body.price , 
        productImage : imagePath
     });
    // console.log (product)
    const creatproduct = await product.save((err,doc)=>{
                if(!err){
                    res.send(doc);
                }else{
                    console.log(err)
                    if(err.code = 11000)
                      res.status(422).send(['product cannot be added'])
                      else return next(err)
                }
              });
}
module.exports.update =  async(req,res)=>{
    const id = req.params.id;
    // console.log(id);
    // if(!ObjectId.isValid(req.params.id))
        // return res.status(400).send('No record with given id')
    const imagePath = 'http://localhost:4000/uploads/' + req.file.filename ;
    const upd = await Product.findByIdAndUpdate(id,{
        productName : req.body.productName , 
        productType : req.body.productType , 
        availibilityDate : req.body.availibilityDate , 
        price : req.body.price , 
        productImage : imagePath
        // productImage : null
     },(err,docs)=>{
        if(!err)
            res.send(docs)
        else console.log('Error in product update')
    });
}
module.exports.currentproduct = (req,res,next)=>{
    const id = req.params.id;
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id')
    Product.findById(id , (err,docs)=>{
        if(!err)
            res.send(docs)
        else{
            console.log('Error in retrieving product')
        }
        })
}

module.exports.display = async (req,res,next)=>{
    Product.find((err,docs)=>{
        if(!err) {
        // console.log(docs)
            res.send(docs)
        }
        else{
            console.log('error in retrieving products')
        }
    });
   
}

module.exports.delete = (req,res,next)=>{
    const id = req.params.id;
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id')

    Product.findByIdAndRemove(id ,(err,docs)=>{
        if(!err)
            res.send(docs)
        else console.log('error in product delete')
    }) 
}

 // const products = await Product.find((err,docs)=>{
    //     if(!err) {
    //     console.log(docs)
    //         res.send(docs)
    //     }
    //     else{
    //         console.log('error in retrieving products')
    //     }
    // });


// module.exports.add = upload,  async (req, res, next) => {
//     const url = req.protocol + "://" + req.get("host");
//       const product = new Product
//       ({
//         productName: req.body.productName,
//         productType: req.body.productType,
//         availibilityDate: req.body.availibilityDate,
//         price : req.body.price,
//         productImage: url + "/uploads/" + req.file.filename
//       });
//       console.log(product)
//       const _ = await product.save((err,doc)=>{
//         if(!err){
//           res.send(doc)
//         }
//         else{
//           console.log(err)
//             if(err.code = 11000)
//               res.status(422).send(['product cannot be added'])
//               else return next(err)
//         }
//       })
//   }
// module.exports.add = upload ,(req,res,next)=>{
// module.exports.add =  (req,res,next)=>{
//     var product = new Product();
//     product.productName = req.body.productName;
//     product.productType = req.body.productType;
//     product.availibilityDate = req.body.availibilityDate;
//     product.price = req.body.price;

//     console.log(product)
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
//   }

// router.post(
//   "",
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     const url = req.protocol + "://" + req.get("host");
//     const product = new Product({
//       productName: req.body.productName,
//       productType: req.body.productType,
//       availibilityDate: req.body.availibilityDate,
//       price : req.body.price,
//       productImage: url + "/uploads/" + req.file.filename
//     });
//     product.save().then(createdProduct => {
//       res.status(201).json({
//         message: "Post added successfully",
//         post: {
//           ...createdProduct,
//           id: createdProduct._id
//         }
//       });
//     });
//   }
// );

// module.exports.add = async (req,res,next)=>{
//     const imagePath = 'http://localhost:4000/uploads/'+ req.file.filename;

//     const product = new Product({
//         productName: req.body.productName,
//         productType: req.body.productType,
//         availibilityDate: req.body.availibilityDate,
//         price : req.body.price,
//         // productImage = 'http://localhost:4000/uploads/'+ req.file.filename
//         productImage :imagePath
//       });
//       console.log(product)
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
    
// }


// const express = require("express");
// const multer = require("multer");

// const Post = require("../models/post");

// const router = express.Router();

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "server/uploads");
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
//       imagePath: url + "/uploads/" + req.file.filename
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
