const express=require('express');
const passport = require('passport');

const router=express.Router();
const postsAPI=require('../../../controllers/api/v1/posts_api');

router.get('/',postsAPI.index);      // return json back to the browser

router.delete('/:id',passport.authenticate('jwt',{session:false}),postsAPI.delete);       // session:false to prevent the making session-cookie

module.exports=router