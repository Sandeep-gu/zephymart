const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type:String,
        required: true,

    },
    description:{
        type:String,
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true,
    },
    photo: {
        type:String,
        required:true,
    },
    shipping:{
        type:Boolean,
    },
    rate:[{
        rating:Number,
        ratingby:{
            type:mongoose.ObjectId,
            ref:'users'

        }
    }]

},{timestamps:true})

module.exports = mongoose.model('product',productSchema);