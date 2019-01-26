var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");

var seed = require("./seed");

//app setting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());
mongoose.connect("mongodb://localhost:27017/dragoncom", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//mongoose model config
var Blog = require("./models/post");
// var UserInfo = require("./models/userInfo");
var User = require("./models/user");
var Comment = require("./models/comments")

//Seed
//seed();

//base route
app.get("/", function(req,res){
    res.redirect("/blogs");
});
//index route
app.get("/blogs", function(req,res){
    let blogs = Blog.find({}, function(err, blogs){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/index", {blogs});
        }
    });
});
//new route
app.get("/blogs/new", function(req,res){
    res.render("blog/new");
});
//create route
app.post("/blogs", function(req,res){
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
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/show", {blog});
        }
    });
});
//edit route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.render("blog/edit",{blog});
        }
    });
});
//update route
app.put("/blogs/:id", function(req,res){
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
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/blogs");
        }
    });
});
//search route
app.post("/blogs/search/", function(req, res){
    Blog.find({$text: {$search: req.body.searchContent}})
       .skip(20)
       .limit(10)
       .exec(function(err, blog) {
           if(err){
               res.send(err);
           }
           else{
               res.render("blog/search", {blog});
           }
       });
});


//=============================
//COMMENTS ROUTE
//=============================
//comment new
app.get("/blogs/:id/comments/new", function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) res.send(err);
        else{
            res.render("comment/new", {blog});
        }
    });
});
//post new comment 
app.post("/blogs/:id/comments/", function(req,res){
    Blog.findById(req.params.id, function(err, blog) {
        if(err) res.send(err);
        else{
            //create comment first
            Comment.create(req.body.comment, function(err, cmt){
                if(err) res.send(err);
                else{
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server on...");
});