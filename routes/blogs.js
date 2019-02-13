var express = require("express");
var router = express.Router();

var Blog = require("../models/post");

//====================
//BLOG ROUTES
//====================

//index route
router.get("/", isLoggedIn, function(req,res){
    let blogs = Blog.find({}, function(err, blogs){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/index", {blogs, currUser: req.user});
        }
    });
});
//new route
router.get("/new", isLoggedIn, function(req,res){
    res.render("blog/new");
});
//create route
router.post("/", isLoggedIn, function(req,res){
    //create blog
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, nblog){
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/blogs");
        }
    });
});
//show route
router.get("/:id", isLoggedIn, function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/show", {blog, currUser: req.user});
        }
    });
});
//edit route
router.get("/:id/edit", isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/edit",{blog, currUser: req.user});
        }
    });
});
//update route
router.put("/:id", isLoggedIn, function(req,res){
    //update blog
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, nblog){
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
//delete route
router.delete("/:id", isLoggedIn, function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/blogs");
        }
    });
});
//search route (not working yet)
router.post("/search/", isLoggedIn, function(req, res){
    Blog.find({$text: {$search: req.body.searchContent}})
       .skip(20)
       .limit(10)
       .exec(function(err, blog) {
           if(err){
               res.send(err);
           }
           else{
               res.render("blog/search", {blog, currUser: req.user});
           }
       });
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