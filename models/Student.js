const mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    username : String,
    password : String,
    images    :  [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Image"
        }
    ]
});


module.exports = mongoose.model("Student",StudentSchema);

