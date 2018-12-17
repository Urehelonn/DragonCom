var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");

//app setting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());
mongoose.connect("mongodb://localhost:27017/restful", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    img: {type:String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKASURBVEhL7dZLqE1RHMfxgxAGhIuBAeWVAVIiJp4DbwMlJBMx8OxKMTLAxGNAZiSkpAyIpAw8Ut5hYOCVZwYiSsjb98v9Z+1t3+Oea5OBX33qnLX3WWudtddjV/61TESv7x//brrhGtaihwV/IkOwDd2/ffuRrtiLT7iHfVgAO1Va5uMZdjd87o9IX2zAA3zBexzCBJSSftgDK7YBG9qBMWiBlrCxE/C6jqMnSolDuQzXEQ3cwkq0h5mC+1iDzhaUnfE4hujAE8yGcQQG4iCuwM6UHit1DkQHTsIh/5CUvUIflBYn1jwMxTtEQ0UuoRNKyUK8hZvKDRQ1mLqNUWhW5uAiHuM5ihqoxpEZgJpTB3cuK/E5usG4ns0K5Bsqsho1xUZnYTPSiuzAJrjW03IdgcM7Ao8ayrajyXH5+DzzFTt0u7A/KUu9xjqMhmvbsjvwTzQ5G5FWeheDYJzZ6bVfOY/YdBo9bIbDLfIo0h+fhZMsLct7gYf4nJQF62uDrYh5kknRswsO9WJcTcqCu1kHGLdbD5D8PWfwEeOQSSucRv4HYQkm40JSlnLWm45wNcSKyPvpRPMsLhomeVqdypXlOeOHoS2MHXmD/E7nd8//TC4jvalWbjSmHQZjEuxQHLNhPTJZhPSGapxwVuDRGGX+mwOIl4hp8PHcRPrbemTSGu6z6U1FnGDOUuOB4JKJay9hg1NhpsN17Qbj9XOI5ZXJWDj7oqIi/os0bhL5Do/EDBh3s8Pw5SLmQGGq7cVP4QrIx3PYa3Gfw74cNce3DLfBtFG51huL+3vc56Sai2bFf7ETvllEhUtRFEdhC1bBGd0Fvx2fi2t0Jnpb8D+1p1L5CnO3SQM33J9HAAAAAElFTkSuQmCC"},
    body: String,
    created: {type:Date, default: Date.now()} 
});
var Blog = mongoose.model("DBlog", blogSchema);

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
            res.render("index", {blogs});
        }
    });
});
//new route
app.get("/blogs/new", function(req,res){
    res.render("new");
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
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.send(err);
        }
        else{
            res.render("show", {blog});
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
            res.render("edit",{blog});
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
       .exec(function(err, blogs) {
           if(err){
               res.send(err);
           }
           else{
               res.render("search", blogs);
           }
       });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server on...");
});