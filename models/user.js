const mongoose = require('mongoose');
const passportLocalMongoose  = require('passport-local-mongoose'); 
const assignment = require('./assignment');

var UserSchema = new mongoose.Schema({
    username   : String,
    enroll     : String,
    password   : String,
    type       : String,
    assignments:    [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Assignment"
        }
    ]
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);