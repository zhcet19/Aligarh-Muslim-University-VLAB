var express  = require('express')
var router   = express.Router()
var passport = require('passport');
const middleWareObj = require('../middleware');
var middleWare = require("../middleware")
var User     = require("../models/user");
var  multer               = require('multer');
var  assignmentModel      = require('../models/assignment');
var  submitassignmentModel=require('../models/submitassignment');


// uplaoding assignment content
var teacherstorage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './public/uploads/teacher') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 


var studentstorage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, './public/uploads/students') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  } 
}); 


var upload = multer({ storage: teacherstorage }); 
var studentupload=multer({storage:studentstorage});

var experiments  = [

    "1. VI Characteristics of a Diode",
    "2. Half Wave Rectification",
    "3. Full Wave Rectification",
    "4. Capacitative Rectification",
    "5. Zener Diode-Voltage Regulator",
    "6. BJT Common Emitter Characteristics**",
    "7. BJT Common Base Characteristics**",
    "8. Studies on BJT CE Amplifier",
    "9. RC Frequency Response"
    ]

router.get("/experiment",middleWare.isLoggedIn, function (req, res) {
    res.render("experimentmenu" , {experiments :experiments });
});

router.get("/index",middleWare.isLoggedIn, function (req, res) {
    res.render("experimentindex");
  });
  

router.get("/theory",middleWare.isLoggedIn, function (req, res) {
  res.render("experimenttheory");
});


router.get("/procedure", middleWare.isLoggedIn, function (req, res) {
  res.render("experimentprocedure");
});


router.get('/assignment',(req, res) => { 
    assignmentModel.find({}, (err, items) => { 
            if (err) { 
                console.log(err); 
            } 
            else { 
                res.render('experimentassignment', { items: items }); 
            } 
        }); 
    }); 
    

// Uploading the assignment by teacher
router.post('/assignment',middleWare.isLoggedIn, upload.single('image'), (req, res, next) => { 
  
    var obj = { 
		subjectcode: req.body.subjectcode,
        topic: req.body.topic, 
        marks_alloted: req.body.marks_alloted, 
		last_date:req.body.last_date,
        img: 'uploads/teacher/' + req.file.filename,
          
    } 
    assignmentModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            
            res.redirect('/assignment'); 
        } 
    }); 
}); 



// Submitting the assignment by student
router.post('/submitassignment',middleWare.isLoggedIn, studentupload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name:req.body.name,
        enrollment_no:req.body.enrollment_no,
        img: 'uploads/students/'+ req.file.filename,
          
    } 
    submitassignmentModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            
            res.redirect('/assignmentdetails'); 
        } 
    }); 
  }); 
  


router.get("/quiz",middleWare.isLoggedIn, function (req, res) {
    res.render("experimentquiz");
});
  
router.get("/liveclass", middleWare.isLoggedIn,function (req, res) {
    res.render("experimentliveclass");
});
  
router.get("/experiment1",middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment1");
});
  
module.exports = router;
