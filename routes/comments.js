var express = require("express");
var router = express.Router({mergeParams: true});

//mongoose models
var Blog = require("../models/post");
var Comment = require("../models/comments");

//=============================
//COMMENTS ROUTE
//=============================
//comment new
router.get("/new", isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) res.send(err);
        else{
            res.render("comment/new", {blog, currUser: req.user});
        }
    });
});
//post new comment 
router.post("/", isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, blog) {
        if(err) res.send(err);
        else{
            //create comment first
            Comment.create(req.body.comment, function(err, cmt){
                if(err) res.send(err);
                else{
                    console.log("id: "+req.user.id+", username: "+req.user.username);
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
router.delete("/:cmtid", isLoggedIn, function(req,res){
    console.log(req.params.id);
    Comment.findByIdAndRemove(req.params.cmtid, function(err, cmt){
        if(err){
            console.log(err);
        }
        else{
            console.log(cmt);
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//=============================
//MIDDLEWARE
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