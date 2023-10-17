const orderModel = require("../models/orderModel");

const getOrderController = async(req,res)=>{
    try{
        const order = await orderModel.find({buyers:req.user._id}).populate("buyers").populate("products");
        console.log(order)
        res.status(200).send({
            success: true,
            message:"successfully created order",
            order
        })
    }catch(error){
        console.log(error);
        res.status(500).send({success:false, message:"Some error are occurs"},error);
    }
}

const getAllOrderController = async(req,res)=>{
    try{
        const orders = await orderModel.find({}).populate("products").populate("buyers").sort({createdAt:"-1"})
        res.status(200).send({
            success: true,
            message: "Successfully found",
            orders
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({success:false, message:"Some error are occurs",error});
    }
}

const updateStatusOrderController = async(req,res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        console.log(id,status);
        const order = await orderModel.findByIdAndUpdate(id,{status:status},{new:true})
        console.log(order)
        res.status(200).send(({
            success: true,
            order,
        }))
    }
    catch(error){
        console.log(error);
        res.status(500).send({success:false, message:"Some error are occured",error});
    }
}
module.exports = {getOrderController,getAllOrderController,updateStatusOrderController}