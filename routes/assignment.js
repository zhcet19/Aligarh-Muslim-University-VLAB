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


router.get('/assignment',middleWare.isLoggedIn, (req, res) => { 
    if(req.user.type=="teacher"){
        var ids = [];
        ids = req.user.assignments;
        assignmentModel.find().where('_id').in(ids).exec((err,items)=>{
            if (err) { 
                console.log(err); 
            } 
            else { 
                res.render('experimentassignment', { items: items }); 
            } 
        });
    }
    else if(req.user.type=="student"){
        assignmentModel.find({}, (err,items)=>{
            if(err)
                console.log(err)
            else    
                res.render("experimentassignment", {items:items});
        });
    }
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

    // grab that user
    User.findById(req.user._id, function(err,user){
        // add assignment to that user!!
        assignmentModel.create(obj, (err, item) => { 
            if (err) { 
                console.log(err); 
            } 
            else { 
                user.assignments.push(item);
                user.save();
                req.flash("success" , "Successfuly added assignment ");
                res.redirect('/assignment'); 
            } 
        }); 
    }); 
});



// TO display all assignments submitted by this user

router.get('/submitassignment',middleWare.isLoggedIn,(req, res) => { 
    submitassignmentModel.find({}, (err, items) => { 
            if (err) { 
                console.log(err); 
            } 
            else { 
                console.log("HIT!!");
                // console.log(items);
                res.render('submittedassignment', { items: items }); 
            } 
        }); 
    }); 

// Route to submitt the assignment by student
// router.post('/submitassignment',middleWare.isLoggedIn, studentupload.single('image'), (req, res, next) => { 
  
//     var obj = { 
//         name:req.body.name,
//         enrollment_no:req.body.enrollment_no,
//         img: 'uploads/students/'+ req.file.filename,
//     } 
//     console.log(obj);

//     User.findById(req.user._id , function(err,user){
//         submitassignmentModel.create(obj, (err, item) => { 
//             if (err) { 
//                 console.log(err); 
//             } 
//             else {
//                 user.assignments.push(item);
//                 user.save();
//                 req.flash("success" , "Successfuly submitted assignment ");
//                 res.redirect('/submitassignment'); 
//             } 
//         }); 
//     }); 
// });


// MISLEneous
router.get("/quiz",middleWare.isLoggedIn, function (req, res) {
    res.render("experimentquiz");
});
  
router.get("/liveclass", middleWare.isLoggedIn,function (req, res) {
    res.render("experimentliveclass");
});
  
router.get("/experiment1",middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment1");
});

// //Downloading the assignment
// router.get('/download/:id',(req,res)=>{  
//     assignmentModel.find({_id:req.params.id},(err,item)=>{  
//         if(err){  
//             console.log(err)  
//         }   
//         else{  
//            var path= __dirname+'/public/'+item[0].img;  
//            res.download(path);  
//         }  
//     });
      
// });  


// show assignment
router.get("/assignment/:id", middleWare.isLoggedIn,async function(req, res){
    
    // grab this assignment
    // grab all the work submitted for this assignment
    // var items = submitassignmentModel.find({ '_id': { $in: ids } });

    assignmentModel.findById(req.params.id, function(err,assignment){
        if(err){
            res.redirect("/assignment");
        } else {
            // submitassignmentModel.findById(assignment)
            // console.log(assignment)
            submitassignmentModel.find().where('_id').in(assignment.submittedassignments).exec((err,items)=>{
            if(err)
                console.log(err)
            else
                console.log(items)
                res.render("assignmentdetails", {items:items, assignment:assignment});
        });
    }
    });

});


// submit work for this assignment
// Route to submitt the assignment by student
router.post('/assignment/:id/submit',middleWare.isLoggedIn, studentupload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name:req.body.name,
        enrollment_no:req.body.enrollment_no,
        img: 'uploads/students/'+ req.file.filename,
    } 
    // console.log(obj);

    // User.findById(req.user._id , function(err,user){
    //     submitassignmentModel.create(obj, (err, item) => { 
    //         if (err) { 
    //             console.log(err); 
    //         } 
    //         else {
    //             user.assignments.push(item);
    //             user.save();
    //             req.flash("success" , "Successfuly submitted assignment ");
    //             // res.redirect('/submitassignment'); 
    //         } 
    //     }); 
    // });


    // for a given assignment save all the assignment submitted for it.
    assignmentModel.findById(req.params.id, function(err, assignment){
        submitassignmentModel.create(obj, (err,item)=> {
        if(err)
            console.log(err)
        else{
            console.log("Added to that assignment your work!!");
            assignment.submittedassignments.push(item);
            assignment.save();
            req.flash("success" , "Successfuly submitted assignment ");
            res.redirect('/submitassignment'); 
        }    
    });
});
});


router.delete("/assignment/:id", function(req, res){
    assignmentModel.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/assignment");
      } else {
          console.log("assignment deleted!!")
          res.redirect("/assignment");
      }
  });
});

  
module.exports = router;
