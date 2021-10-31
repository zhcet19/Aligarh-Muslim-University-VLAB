var mongoose = require('mongoose'); 
  
var assignmentSchema = new mongoose.Schema({ 
	subjectcode: String,
    topic: String, 
    marks_alloted:Number, 
	last_date:String,
    img:String ,
	created: {type: Date,default: Date.now},
    submittedassignments:    [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Submitassignment"
        }
    ]
}); 

// 1 submitted   0 not submitted 
module.exports = new mongoose.model('Assignment',assignmentSchema); 
