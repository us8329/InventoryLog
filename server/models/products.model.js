const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // username:{
    //     type:String,
    //     // required:true
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
    productImage:{
        type:String,
        required:true,
    }
})

const Products = new mongoose.model("Product" , productSchema);
module.exports = Products;
// mongoose.model("Product",productSchema);