const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    answer:{
        type:String,
        require:true,
    }
    ,
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    },
    photo:{
        type:String,
    }
},{timestamps:true});

module.exports =mongoose.model('users',userSchema);