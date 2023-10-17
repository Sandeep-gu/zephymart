const express = require('express');

const { checkAuthUser, checkAuthAdmin } = require('../middlewares/authMiddleware');
const { createCategory,updateCategory, getAllCategory, getSingleCategory,deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

//create Category category post Route
router.post('/create-category',checkAuthUser,checkAuthAdmin,createCategory);

//update Category category
router.put('/update-category/:id',checkAuthUser,checkAuthAdmin,updateCategory);

//get All Category
router.get('/all-category',getAllCategory)

//get single category
router.get('/single-category/:slug',getSingleCategory)

//deleted Category
router.delete('/delete-category/:id',checkAuthUser,checkAuthAdmin,deleteCategory);
module.exports = router;