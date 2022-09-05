const express=require('express');
const router=express.Router();

const posts_controller=require('../controllers/posts_controller.js');

router.post('/create',posts_controller.create);

module.exports=router