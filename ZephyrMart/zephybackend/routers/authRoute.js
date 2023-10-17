const express = require('express');
const {registerController,deleteUserController,useDetailsController,loginController,getAllDataController,forgetPasswordController,updateUserController} = require('../controllers/authController');
const {checkAuthUser,checkAuthAdmin,emailValidator} = require('../middlewares/authMiddleware');
const router = express.Router();
//signup user and admin
router.post('/register',emailValidator,registerController);
//login user and admin
router.post('/login',emailValidator,loginController);
//only for admin user are controlled data in the database
router.get('/post',checkAuthUser,checkAuthAdmin,getAllDataController);

//user || get route
router.get('/user-auth',checkAuthUser,(req,res)=>{
    
    res.status(200).send({ok:true});
    
    
})
//admin || get route
router.get('/admin-auth',checkAuthUser,checkAuthAdmin,(req,res)=>{
    
    res.status(200).send({ok:true});
    
    
})

// forget Password || Method post
router.post('/forgetPassword',forgetPasswordController)

//update user details
router.put('/update-user',checkAuthUser,updateUserController);

//fetch ALL user details
router.get('/all-users',checkAuthUser,checkAuthAdmin,useDetailsController);

//delete user
router.delete('/delete-user/:id',checkAuthUser,checkAuthAdmin,deleteUserController);

module.exports = router