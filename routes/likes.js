const express=require('express');
const router=express.Router();
const likesController=require('../controllers/likes_contoller');

router.post('/toggle',likesController.toggleLike)

module.exports=router;