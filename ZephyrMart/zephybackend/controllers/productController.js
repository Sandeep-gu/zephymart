const { response } = require('express');
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const orderModel = require('../models/orderModel');

const fs = require('fs');
const slugify = require('slugify');
//payment gateway
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MerchantID,
  publicKey: process.env.PublicKey,
  privateKey: process.env.privateKey
});
//Upload all data in the database
const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping,photo } = req.body;
        console.log(req.body)

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' });
            case !description:
                return res.status(500).send({ error: 'description is required' });
            case !price:
                return res.status(500).send({ error: 'price is required' });
            case !category:
                return res.status(500).send({ error: 'category is required' });
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' });
            case !photo || photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required but less than 10mb' });
        }

        const products = new productModel({ ...req.body, slug: slugify(name) })
        try {
            const savedProduct = await products.save();
            res.status(200).send({
                success: true,
                message: "Product Created Successfully",
                products: savedProduct,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error saving product',
                error: error.message
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
};
//get all product controller
const getProductController = async(req,res)=>{
    try{
        const products = await productModel.find({}).populate('category');
        if(products){
            res.status(200).send({
                success:true,
                message:"get product Success",
                products,
            })
        }

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
            
        });
    }
}
//get all iamge of the database
const getProductImageController = async(req,res)=>{
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            totalCount: products.length,
            message:"Successfully retrieved",
            products
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error,
        })
    }
}

//find single product by name
const getSingleProductController = async(req,res)=>{
    try{
        console.log
        const product = await productModel.findOne({slug:req.params.slug}).populate('category');
        console.log(product)
        res.status(200).send({
            success:true,
            message:"Successfully found product",
            product,
        })
        
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error,

        });
    }
}

//getphoto of given id
const getPhotoController = async(req,res)=>{
    try{
    const product =await productModel.findById(req.params.pid).select("photo");
    if(product.photo.data){
    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data)
    }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:"something went wrong",
            error,
        })
    }
}

//deleted product from the database
const deleteProductController = async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
        success:true,
        message:"Successfully deleted product from the database",
    })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Something went wrong",
        })
    }
    
}

//update data from the product database
const updateProductController = async(req,res)=>{
    try{
    const {name,price,category,description,shipping,slug,quantity,photo} = req.body;
    //validation
    switch (true) {
        case !name:
            return res.status(500).send({ error: 'name is required' });
        case !description:
            return res.status(500).send({ error: 'description is required' });
        case !price:
            return res.status(500).send({ error: 'price is required' });
        case !category:
            return res.status(500).send({ error: 'category is required' });
        case !quantity:
            return res.status(500).send({ error: 'quantity is required' });
        case !photo && photo.size > 100000:
            return res.status(500).send({ error: 'photo is required but less than 10mb' });
    }
    const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.body,slug:slugify(name)})
    await products.save();

    res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        products,
    });
}catch(error){
    console.log(error);
        response.status(500).send({
            success: false,
            message:"something went wrong while updating",
            error,
        })
}
}
const filterProductController = async(req,res)=>{
    const {checked,radio} = req.body;
    console.log(checked + " " + radio)
    const args = {}
    if (checked.length>0) args.category=checked;
    if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]}

        try{
            const product = await productModel.find(args);
            console.log(product)
            res.status(200).send({
                success: true,
                message:"Successfully find filter data",
                product,
            })
        }
        catch(error){
            console.log(error)
            res.status(500).send({
                success:false,
                message:error.message,
                error,
            })
        }
    
}
//through this function i fetch all data those search in the search box
const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        console.log(keyword)
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        });

        
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};
//similiar product api
const similiarProductController = async(req,res)=>{
    try{
        const {cid,pid} = req.params;
        console.log(cid,pid);
        const product = await productModel.find({
            category:cid,
            _id:{$ne:pid},
        })
        console.log("product is " + product)
        res.status(200).send({
            success:true,
            message:"product successfully found",
            product,
        })
    }
    catch(error){
        res.status(500).send({success:false,message:error.message,error})
    }
}

//find product of given category
const categoryProductController = async(req,res)=>{
    try{
        console.log(req.params)
        const category = await categoryModel.findOne({slug:req.params.slug})
        console.log("category is "+category)
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success: true,
            message:"Successfully found product",
            products,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,message:error.message,error})
    }
}
//update rating of the employee
const userRatingController = async(req,res)=>{
    try{
        const postId = req.body.postId;
        const rate = {rating:req.body.rate,ratingby:req.user._id};
        const rating = await productModel.findByIdAndUpdate(postId,
            {$push:{rate:rate}},{new:true})
        res.status(200).send({success:true,message:"successfully updated rating",rating});
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,message:"Some Error occurred in Rating Controller",error})
    }
}
//payment gateway
const getPaymentTokenController = async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send({success:false,message:err.message,err});

            }
            else{
                res.send(response)
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

const getPaymentController = async(req,res)=>{
    try{
        const {cart,nonce} = req.body;
        let total = 0;
        cart.map((i)=>{total+=i.price});
        let newTransaction = gateway.transaction.sale(
            {
              amount: total,
              paymentMethodNonce: nonce,
              options: {
                submitForSettlement: true,
              },
            },
            function (err, result) {
                if(result){
                    const order = new orderModel({
                        products:cart,
                        payment:result,
                        buyers:req.user._id
                    }).save()
                    res.json({ok:true})
                }
                else{
                console.error(err);
                return;
              }
            }
        )
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {getPaymentTokenController,userRatingController,getPaymentController,categoryProductController,searchProductController,similiarProductController, filterProductController,createProductController,getProductController,getProductImageController,getSingleProductController,getPhotoController,deleteProductController,updateProductController };
