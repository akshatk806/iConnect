const express=require('express');
const router=express.Router();

const users_controller=require('../controllers/users_controller.js')

router.get('/profile',users_controller.profile)
router.get('/posts',users_controller.posts)

module.exports=router;