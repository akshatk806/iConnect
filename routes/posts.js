const express=require('express');
const router=express.Router();
const passport=require('passport');

const posts_controller=require('../controllers/posts_controller.js');

router.post('/create',passport.checkAuthentication,posts_controller.create);

router.get('/delete/:id',passport.checkAuthentication,posts_controller.delete);

module.exports=router