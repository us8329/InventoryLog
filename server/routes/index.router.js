const express= require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Product = require('../models/products.model')
const multer = require('multer');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper')
const {Products} = require('../models/products.model')

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'./uploads');
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const upload = multer({storage: storage }).single('productImage')

const ctrlUser = require('../controllers/user.controller')
const ctrlProduct = require('../controllers/products.controller')

router.post('/register' , ctrlUser.register)
router.post('/authenticate' , ctrlUser.authenticate)
router.get('/userprofile' , jwtHelper.verifyJwtToken , ctrlUser.userProfile)


router.post('/add' ,ctrlProduct.add)

// router.post('/add' ,upload , (req,res)=>{

//     console.log(req.body);
//     const url = req.protocol + "://" + req.get("host");

//     var product = new Product();
//     product.productName = req.body.productName;
//     product.productType = req.body.productType;
//     product.availibilityDate = req.body.availibilityDate;
//     product.price = req.body.price;
//     product.productImage = url + "/uploads/"+ req.file.filename;
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


router.get('/display' , ctrlProduct.display)
router.put('/:id' , ctrlProduct.update)
router.delete('/:id' , ctrlProduct.delete)
module.exports = router;
 
