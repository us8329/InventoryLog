const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // user:{
    //     type:String,
    // },
    productName :{
        type:String,
        required : true
    },
    productType :{
        type:String , 
        required:true,
    },
    availibilityDate :{
        type:String , 
        required:true,
    },
    price :{
        type:String , 
        required:true,
    },
    // image:{
    //     type:String,
    // }
})

const Products = new mongoose.model("Product" , productSchema);
module.exports = Products;
// mongoose.model("Product",productSchema);