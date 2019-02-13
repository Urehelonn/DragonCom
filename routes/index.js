var express = require("express");
var router = express.Router();
var passport = require("passport");

//mongoose models
var User = require("../models/user");

//=============================
//USER AUTHENTICATION ROUTE
//=============================
//sign up form
router.get('/signup', function(req,res){
    res.render('auth/signup', {currUser: req.user});
});
//sign in and store data into database
router.post('/signup', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('signup');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect('/blogs');
        })
    });
});
//log in form
router.get('/login', function(req,res){
    res.render('auth/login', {currUser: req.user});
});
//log in
router.post('/login', passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/signup',
}), function(req,res){});

//logout
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

//=============================
//FUNCTIONS
//=============================
//redirect function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//exports
module.exports = router;