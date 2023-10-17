const express= require('express');
const { checkAuthUser, checkAuthAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const {getOrderController,getAllOrderController,updateStatusOrderController} = require('../controllers/orderController');

//get order of authentication users
router.get('/orders',checkAuthUser,getOrderController)

//get all orders to the admin
router.get('/all-orders',checkAuthUser,checkAuthAdmin,getAllOrderController)


//update status of orders
router.put('/update-status/:id',checkAuthUser,checkAuthAdmin,updateStatusOrderController)

module.exports = router;