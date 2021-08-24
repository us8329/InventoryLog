const mongoose = require('mongoose')
const Product = require('../models/products.model')
const multer = require('multer');
const ObjectId = require('mongoose').Types.ObjectId;

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'./server/uploads/');
    },
    filename: (req,file,cb)=>{
        // const ext = path.extname(file.originalname)
        // const filePath = '/Users/utkarshsinha/mongoosedemo/uploads/'
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const upload = multer({storage: storage })

module.exports.add = (req,res,next)=>{
    // const upload = multer({storage: storage })
    var product = new Product();
    product.productName = req.body.productName;
    product.productType = req.body.productType;
    product.availibilityDate = req.body.availibilityDate;
    product.price = req.body.price;
    // product.productImage = req.file.path;
    // console.log(req.file)
    product.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log(err)
            if(err.code = 11000)
              res.status(422).send(['product cannot be added'])
              else return next(err)
        }
      })
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

module.exports.display = (req,res,next)=>{
    Product.find((err,docs)=>{
        if(!err) 
            res.send(docs)
        else{
            console.log('error in retrieving products')
        }
    });
}
module.exports.update = (req,res,next)=>{
    const id = req.params.id;
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id')

    Product.findByIdAndUpdate(id , {
        productName: req.body.productName,
        productType: req.body.productType,
        availibilityDate:req.body.availibilityDate,
        price:req.body.price
        // image:new_image
    },(err,docs)=>{
        if(!err)
            res.send(docs)
        else console.log('Error in product update')
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