const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');

//create a new category
const createCategory = (req,res)=>{
    const {name} = req.body
    try{
        if(!name){
            return res.status(401).send({message:"Enter Category"})

        }
        const existingCategory = categoryModel.findOne({name:name})
        console.log(existingCategory.name)
        if(existingCategory.name){
            return res.status(200).send({message:"Category already exists"})
        }
        else{
            const category = new categoryModel({name:name,slug:slugify(name)}).save();
            res.status(201).send({
                success:true,
                message:"Successfully Store Category",
                category
            })
        }
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:error.message,
            error
        })
    }
}

//update the category
const updateCategory = async(req,res)=>{
    try{
        const {name} = req.body;
        const id = req.params.id;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message: "Successfully updated the category",
            category
        })

    }
    catch(error){
        console.error(error)
        res.status(500).send({
            success:false,
            message:error.message,
            error
        })
    }
}

//get all category through get Route
const getAllCategory = async(req,res)=>{
    try{
        const category =await categoryModel.find({})
        console.log(category)
        if(category){
            
            res.status(200).send({
                success:true,
                message: "successfully found category",
                category
            })
        }else{
            res.status(500).send({
                success:false,
                message:"Something Error occurred",
                
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:error.message,
            error
        })
    }
}
const getSingleCategory = async(req,res)=>{
    try{
        const slug = req.params.slug;
        const category =  await categoryModel.findOne({slug:slug});
        if(category){
            res.status(200).send({
                success:true,
                message:"successfully found category",
                category,
            })
        }else{
            res.status(404).send({
                success:false,
                message:"category not found",
                
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:error.message,
            error,
        });
    }
}

const deleteCategory = async(req,res)=>{
    try{
        const id = req.params.id;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({success:true, message:"Successfully deleted category"});
    }
    catch(error){
        res.status(500).send({success:false, message:error.message,error});
    }
}
module.exports ={createCategory,updateCategory,getAllCategory,getSingleCategory,deleteCategory};