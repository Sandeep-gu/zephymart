const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    }
    ,
    slug:{
        type: 'string',
        require:true,
    }
})
module.exports = mongoose.model('category',categoryModel)
