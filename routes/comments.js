var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");

//mongoose models
var Blog = require("../models/post");
var Comment = require("../models/comments");


//=============================
//      COMMENTS ROUTE
//=============================

//comment new
router.get("/new", middleware.isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) res.send(err);
        else{
            res.render("comment/new", {blog, currUser: req.user});
        }
    });
});
//post new comment 
router.post("/", middleware.isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, blog) {
        if(err) res.send(err);
        else{
            //create comment first
            Comment.create(req.body.comment, function(err, cmt){
                if(err) res.send(err);
                else{
                    //add user id and username for comment searching and display
                    cmt.author.id = req.user.id;
                    cmt.author.username = req.user.username;
                    cmt.save();
                    //push comment to blog
                    blog.comments.push(cmt);
                    blog.save();
                    //redirect to blog detail
                    res.redirect("/blogs/"+blog.id);
                }
            });
        }
    });
});

//delete certain comment in show page
router.delete("/:cmtid", middleware.isAuthor, function(req,res){
    console.log(req.params.id);
    Comment.findByIdAndRemove(req.params.cmtid, function(err, cmt){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//exports
module.exports = router;