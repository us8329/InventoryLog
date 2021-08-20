const express= require('express')
const passport = require('passport')
const router = express.Router();
const jwtHelper = require('../config/jwtHelper')
const {Products} = require('../models/products.model')

const ctrlUser = require('../controllers/user.controller')
const ctrlProduct = require('../controllers/products.controller')

router.post('/register' , ctrlUser.register)
router.post('/authenticate' , ctrlUser.authenticate)
router.get('/userprofile' , jwtHelper.verifyJwtToken , ctrlUser.userProfile)


router.post('/add' , ctrlProduct.add)
router.get('/display' , ctrlProduct.display)
// router.get('/:id' , ctrlProduct.currentproduct)
router.put('/:id' , ctrlProduct.update)
router.delete('/:id' , ctrlProduct.delete)
module.exports = router;
 