const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const passport = require('passport')
const { stringify } = require('querystring');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    // username :{
    //     type:String,
    //     required: 'username can\'t be empty'
    // } ,
    email :{
        type:String,
        required: 'email can\'t be empty',
        unique : true
    },
    password :{
        type:String,
        required : 'password can\'t be empty',
        minlength :[4, 'Password must be atleast 4 characters long']
    } ,
    confirmpassword :{
        type:String ,
        required:true
    }

})

userSchema.path('email').validate((val)=>{
    emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    return emailRegex.test(val);
} , 'Invalid e-mail');


userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword = undefined;
    }
    next();
})

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password , this.password)
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id :this._id},
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXP
        });
    
}

// const Register = new
mongoose.model("User",userSchema);
// module.exports = Register ;