const mongoose = require('mongoose')
const Product = require('../models/products.model')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.add = (req,res,next)=>{
    var product = new Product();
    product.productName = req.body.productName;
    product.productType = req.body.productType;
    product.availibilityDate = req.body.availibilityDate;
    product.price = req.body.price;
    product.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            if(err.code = 11000)
              res.status(422).send(['product added'])
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