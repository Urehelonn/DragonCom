var mongoose = require("mongoose");
var userInfoSchema = new mongoose.Schema({
    //Name, Spicies, Age, Colour, Title, Gender, User Avatar, and Self introduction.
    name: String,
    race: String,
    age: String,
    colour: String,
    title: String,
    gender: String,
    selfIntro: String,
    avatar: String,
    //associated user
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
});
module.exports = mongoose.model("UserInfo", userInfoSchema);