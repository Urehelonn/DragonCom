//base
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");

//routes
var commentRoutes = require("./routes/comments");
var blogRoutes = require("./routes/blogs");
var authRoutes = require("./routes/index");

//auth
var passport = require("passport");
var passportLocal = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");

//extra
var seed = require("./seed");

//app setting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());

//mongoose setting
mongoose.connect("mongodb://localhost:27017/dragoncom", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//mongoose model
var Blog = require("./models/post");
// var UserInfo = require("./models/userInfo");
var User = require("./models/user");
var Comment = require("./models/comments")

//Seed
//seed();

//passport config
app.use(expressSession({
    secret: "The Dragon's net.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//routes import
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/", authRoutes);

//=============================
//BASE ROUTE
//=============================
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//=============================
//LISTENING
//=============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server on...");
});





