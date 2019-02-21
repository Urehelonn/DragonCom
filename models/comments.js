var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    text: String,
    blog: {type:mongoose.Schema.Types.ObjectId},
    author: {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", CommentSchema);