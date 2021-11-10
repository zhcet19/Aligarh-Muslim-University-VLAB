var mongoose = require('mongoose'); 
  
var submitassignmentSchema = new mongoose.Schema({ 
	
     name:String,
     enrollment_no:String,
     img:String ,
	created: {type: Date,default: Date.now},
     topic:String

}); 


module.exports = new mongoose.model('Submitassignment',submitassignmentSchema); 
