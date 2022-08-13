// This index.js is my entry point to all the routes  (index.js is root)
const express=require('express');
const home_controller=require('../controllers/home_controller.js')
const about_controller=require('../controllers/about_controller.js')

// Creating a new route handler
const router=express.Router();      // express router search in to google and read about express router on express documentation

router.get('/',home_controller.home)
router.get('/about',about_controller.about)
router.use('/users',require('./users.js'));

// for any further routes, access from here
// router.use('/routerName',require('./routerFile'))

module.exports=router;