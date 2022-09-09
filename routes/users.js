const express=require('express');
const router=express.Router();
const passport=require('passport');

const users_controller=require('../controllers/users_controller.js')

// Accsess the profile page only if user is signed-in
router.get('/profile/:id',passport.checkAuthentication,users_controller.profile)
router.post('/update/:id',passport.checkAuthentication,users_controller.update)

router.get('/posts',users_controller.posts)

router.get('/sign-up',users_controller.signup)
router.get('/sign-in',users_controller.signin)

router.post('/create',users_controller.create)


// Create a session
// Use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(                       // authenticate is inbuilt function
    'local',
    {failureRedirect:'/users/sign-in'}
),users_controller.createSession)


router.get('/sign-out',users_controller.destroySession)

module.exports=router;