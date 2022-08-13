// This index.js is my entry point to all the routes
const express=require('express');
const home_controller=require('../controllers/home_controller.js')

// Creating a new route handler
const router=express.Router();      // express router search in to google and read about express router on express documentation

router.get('/',home_controller.home)

module.exports=router;