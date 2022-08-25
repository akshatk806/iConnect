const express=require('express');
const router=express.Router();
const passport=require('passport');

const users_controller=require('../controllers/users_controller.js')

router.get('/profile',users_controller.profile)
router.get('/posts',users_controller.posts)

router.get('/sign-up',users_controller.signup)
router.get('/sign-in',users_controller.signin)

router.post('/create',users_controller.create)


// Create a session
// Use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),users_controller.createSession)


module.exports=router;