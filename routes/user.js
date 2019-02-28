var express = require("express");
var router = express.Router();
var middleware = require("../middleware")

var User = require("../models/user");
var UserInfo = require("../models/userInfo");


// ================================
// USER ROUTES
// ================================

//check user main page, with some general info
router.get("/", middleware.isLoggedIn, function(req,res){
    let currUser=req.user;
    let userInfo = currUser.userInfo;
    console.log("currUser: "+currUser);
    console.log("currUser.userInfo: "+userInfo);
    console.log("currUser.userInfo.avatar: "+userInfo.avatar);
    
    res.render("user/user", {currUser});
});

//user info page
router.get("/info", middleware.isLoggedIn, function(req,res){
    res.render("user/userInfo", {currUser:req.user});
});

module.exports = router;