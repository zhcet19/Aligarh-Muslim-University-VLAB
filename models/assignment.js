var mongoose = require('mongoose'); 
  
var assignmentSchema = new mongoose.Schema({ 
	subjectcode: String,
    topic: String, 
    marks_alloted:Number, 
	last_date:String,
     img:String ,
  
	created: {type: Date,default: Date.now}
}); 

module.exports = new mongoose.model('Assignment',assignmentSchema); 
