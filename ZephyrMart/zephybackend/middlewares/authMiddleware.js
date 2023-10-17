const JWT = require('jsonwebtoken')
const userModels = require('../models/userModel')
const { body, validationResult } = require('express-validator');
//EMAIL VALIDATOR
const emailValidator = async(req,res,next)=>{
    const validator = 
        [ 
            body('email').isEmail(),
            body('password').isLength({min:5})
        ]
    try{
        const errors = validationResult(validator);
        if(!errors.isEmpty){
            return res.status(400).send({
                success: false,
                message:"please enter a valid credentials",
                
            });
        }
        next();
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong in the validation process",
            error,
        })
    }
    
}
//CHECK USER AUTHORISED OR NOT
const checkAuthUser = (req,res,next) => {
    try{
        
        const decode = JWT.verify(req.headers.authorization,process.env.SECRETE_JWT);
        req.user=decode;
        console.log(req.user)
        next();
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: err.message,
            err,
        })
    }
}
//CHECK ADMIN IS AUTHORIZED OR NOT
const checkAuthAdmin = async(req,res,next)=>{
    try{
        const user = await userModels.findById({_id:req.user._id})
        
        if(user.role !== 1){
            res.status(404).send({
                success:false,
                message:"Non Authorized user"
            })
        }
        
        next();
    }
    catch(err){
        res.status(404).send({
            success:false,
            message:err.message,
            err
        })
    }
}
module.exports = {checkAuthUser,checkAuthAdmin,emailValidator};