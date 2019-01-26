var mongoose = require("mongoose");
var userInfoSchema = new mongoose.Schema({
    //Name, Spicies, Age, Colour, Title, Gender, and Self introduction.
    name: String,
    race: String,
    age: String,
    colour: String,
    title: String,
    gender: String,
    selfIntro: String
});
module.exports = mongoose.model("UserInfo", userInfoSchema);