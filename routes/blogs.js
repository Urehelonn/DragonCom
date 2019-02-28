var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

var Blog = require("../models/post");

//==========================
//      BLOG ROUTES
//==========================

//index route
router.get("/", middleware.isLoggedIn, function(req,res){
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
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("blog/new", {currUser: req.user});
});
//create route
router.post("/", middleware.isLoggedIn, function(req,res){
    //create blog
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, nblog){
        if(err){
            res.send(err);
        }
        else{
            nblog.author.id = req.user.id;
            nblog.author.name = req.user.username;
            nblog.save();
            req.flash("success", "Post Created!");
            res.redirect("/blogs");
        }
    });
});
//show route
router.get("/:id", middleware.isLoggedIn, function(req,res){
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
router.get("/:id/edit", middleware.isAuthor, function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            // console.log("editting...")
            res.render("blog/edit",{blog, currUser: req.user});
        }
    });
});

//update route
router.put("/:id", middleware.isAuthor, function(req,res){
    //update blog
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, nblog){
        if(err){
            res.send(err);
        }
        else{
            req.flash("success", "Post Updated!");
            //redirect
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//delete route
router.delete("/:id", middleware.isAuthor, function(req,res){
    //remove every comments under the blog
    
                    //dfgsdcv
                    //asdrgsdfg
    
    //remove blog
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            req.flash("success", "Post Deleted!");
            res.redirect("/blogs");
        }
    });
});
//search route (not working yet)
router.post("/search/", middleware.isLoggedIn, function(req, res){
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



//exports
module.exports = router;