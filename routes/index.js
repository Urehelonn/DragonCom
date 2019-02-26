var express = require("express");
var router = express.Router();
var passport = require("passport");

//mongoose models
var User = require("../models/user");
var UserInfo = require("../models/userInfo");

//=============================
//  USER AUTHENTICATION ROUTE
//=============================

//sign up form
router.get('/signup', function(req,res){
    res.render('auth/signup', {currUser: req.user});
});

//sign in and store data into database
router.post('/signup', function(req,res){
    let newInfo = new UserInfo({
                name: "N/A",
                race: "N/A",
                age: "N/A",
                colour: "N/A",
                title: "N/A",
                gender: "N/A",
                selfIntro: "N/A",
                avatar: "N/A"});
    var newUser = new User({username: req.body.username});
            
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('signup');
        }
        else{
            //initialize userInfo for new registered user
            UserInfo.create(newInfo, function(err, info){
                if(err){
                    res.send(err);
                }
                else{
                    user.userInfo=info;
                    user.save();
                    // console.log("user: "+user);
                    // console.log("userinfo: "+info);
                    // console.log("user.userInfo: "+user.userInfo);
                }
            });
            
            passport.authenticate("local")(req,res,function(){
                res.redirect('/blogs');
            });
        }
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
}), function(req,res){
});

//logout
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});


//exports
module.exports = router;