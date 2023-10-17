const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        }
    ],
    payment: {},
    buyers: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process","Processing","Shipped","Delivered","Cancel"]
    },
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
