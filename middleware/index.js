var Blog = require("../models/post");
var UserInfo = require("../models/userInfo");
var User = require("../models/user");
var Comment = require("../models/comments");

//where all the middleware goes
var middlewareObj = {};

// =============================
//      MIDDLEWARE METHODS
// =============================

//if user has continue, else redirect function
middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("err", "Please log in first.");
    res.redirect("/login");
}

//if current user is the author of certain blog
middlewareObj.isAuthor = function (req,res,next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, blog) {
            if(err){
                //console.log("err, send back");
                console.log(err);
                res.redirect("back");
            }
            else{
                //if is the author
                if(blog.author.id.equals(req.user.id)){
                    return next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("err", "Please log in first.");
        res.redirect("back");
    }
}


module.exports = middlewareObj;