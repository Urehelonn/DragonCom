//base
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");
var flash = require("connect-flash");

//routes
var commentRoutes = require("./routes/comments");
var blogRoutes = require("./routes/blogs");
var authRoutes = require("./routes/index");
var userRoutes = require("./routes/user")

//auth
var passport = require("passport");
var passportLocal = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");

//extra
var middleware = require("./middleware");
var seed = require("./seed");

//app setting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(flash());

//mongoose setting
mongoose.connect("mongodb://localhost:27017/dragoncom", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//mongoose model
var Blog = require("./models/post");
var UserInfo = require("./models/userInfo");
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

//local stored variables
app.use(function(req,res,next){
    res.locals.currUser = req.user;
    res.locals.error = req.flash("err");
    res.locals.success = req.flash("success");
    next();
});


//routes import
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/", authRoutes);
app.use("/user", userRoutes);

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





