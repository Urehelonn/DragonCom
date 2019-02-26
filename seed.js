var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment = require("./models/comments")

mongoose.connect("mongodb://localhost:27017/dragoncom", { useNewUrlParser: true });

const data = [
    {
        title: "new post 1",
        img: "https://cdn3.bigcommerce.com/s-nadnq/product_images/uploaded_images/24.jpg",
        body: "this is a cute buddy!"
    },
    {
        title: "new post 2",
        img: "https://www.veterinaireanimovet.com/wp-content/uploads/2015/11/veterinaire-guide-soins-furets-1.jpg",
        body: "this is another cute buddy!"
    },
    {
        title: "new post 3",
        img: "http://r.ddmcdn.com/s_f/o_1/APL/uploads/2014/10/small-pets5.jpg",
        body: "there are so many cute buddies!"
    }];
    
const cmt = {text: "new comment", author:"Georage The RedNose"};

function seedDb(){
    //find all post to see if it's post problem
    Post.deleteMany({}, function(err,removedt){
        // if(err){
        //     console.log(err);
        // }
        // else{
        //     console.log("find in seed: "+removedt.length);
        //     data.forEach(function(dt){
        //         Post.create(dt, function(err,blog){
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("add blog succeed.");
        //                 Comment.create(cmt, function(err, comment){
        //                     if(err) console.log(err);
        //                     else{
        //                         blog.comments.push(comment);
        //                         blog.save();
        //                         console.log("comment added!");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports=seedDb;