const express=require('express');

const router=express.Router();
const postsAPI=require('../../../controllers/api/v1/posts_api');

router.get('/',postsAPI.index);      // return json back to the browser

router.delete('/:id',postsAPI.delete);

module.exports=router