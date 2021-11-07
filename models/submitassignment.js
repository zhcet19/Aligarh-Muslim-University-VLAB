var mongoose = require('mongoose'); 
  
var submitassignmentSchema = new mongoose.Schema({ 
	topic:String,
     name:String,
     enrollment_no:String,
     img:String ,
	created: {type: Date,default: Date.now},

}); 


module.exports = new mongoose.model('Submitassignment',submitassignmentSchema); 
