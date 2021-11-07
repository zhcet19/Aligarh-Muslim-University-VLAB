var express = require('express')
var router = express.Router()
var passport = require('passport');
const middleWareObj = require('../middleware');
var middleWare = require("../middleware")
var User = require("../models/user");
var multer = require('multer');
var assignmentModel = require('../models/assignment');
var submitassignmentModel = require('../models/submitassignment');


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
var studentupload = multer({ storage: studentstorage });

var experiments = [

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

router.get("/experiment", middleWare.isLoggedIn, function (req, res) {

    res.render("experimentmenu", { experiments: experiments });
});

router.get("/index/:number", middleWare.isLoggedIn, function (req, res) {
    var experimentnumber = req.params.number;
    res.render("experimentindex", { experimentnumber: experimentnumber });
});

// Experiments 
router.get("/theory1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment1/theory");
});

router.get("/procedure1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment1/procedure");
});

router.get("/simulation1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment1/simulation");
});
router.get("/theory2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment2/theory");
});

router.get("/procedure2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment2/procedure");
});

router.get("/simulation2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment2/simulation");
});

router.get("/theory3", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment3/theory");
});

router.get("/procedure3", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment3/procedure");
});

router.get("/simulation3", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment3/simulation");
});
router.get("/theory4", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment4/theory");
});

router.get("/procedure4", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment4/procedure");
});

router.get("/simulation4", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment4/simulation");
});
router.get("/theory5", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment5/theory");
});

router.get("/procedure5", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment5/procedure");
});

router.get("/simulation5", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment5/simulation");
});
router.get("/theory6", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment6/theory");
});

router.get("/procedure6", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment6/procedure");
});

router.get("/simulation6", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment6/simulation");
});
router.get("/simulation6.1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment6/part1");
});

router.get("/simulation6.2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment6/part2");
});
router.get("/simulation7.1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment7/part1");
});

router.get("/simulation7.2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment7/part2");
});

router.get("/theory7", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment7/theory");
});

router.get("/procedure7", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment7/procedure");
});

router.get("/simulation7", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment7/simulation");
});
router.get("/theory8", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment8/theory");
});

router.get("/procedure8", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment8/procedure");
});

router.get("/simulation8", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment8/simulation");
});
router.get("/theory9", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment9/theory");
});

router.get("/procedure9", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment9/procedure");
});

router.get("/simulation9", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment9/simulation");
});
router.get("/simulation9.1", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment9/part1");
});

router.get("/simulation9.2", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment9/part2");
});
router.get("/theory10", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment10/theory");
});

router.get("/procedure10", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment10/procedure");
});

router.get("/simulation10", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment10/simulation");
});
router.get("/theory11", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment11/theory");
});

router.get("/procedure11", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment11/procedure");
});

router.get("/simulation11", middleWare.isLoggedIn, function (req, res) {
    res.render("experiments/experiment11/simulation");
});



router.get('/assignment', middleWare.isLoggedIn, (req, res) => {
    if (req.user.type == "Teacher") {
        var ids = [];
        ids = req.user.assignments;
        assignmentModel.find().where('_id').in(ids).exec((err, items) => {

            if (err) {
                console.log(err);
            }
            else {
                res.render('experimentassignment', { items: items });
            }
        });
    }
    else if (req.user.type == "Student") {
        assignmentModel.find({}, (err, items) => {
            if (err)
                console.log(err)
            else
                res.render("experimentassignment", { items: items });
        });
    }
});


// Uploading the assignment by teacher
router.post('/assignment', middleWare.isLoggedIn, upload.single('image'), (req, res, next) => {
    





    var obj = {
        subjectcode: req.body.subjectcode,
        topic: req.body.topic,
        marks_alloted: req.body.marks_alloted,
        last_date: req.body.last_date,
        img:'uploads/teacher/' + req.file.filename,

    }

    // grab that user
    User.findById(req.user._id, function (err, user) {
        // add assignment to that user!!
        assignmentModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                user.assignments.push(item);
                user.save();
                req.flash("success", "Successfuly added assignment ");
                res.redirect('/assignment');
            }
        });
    });
});



// TO display all assignments submitted by this user
router.get('/submitassignment', middleWare.isLoggedIn, (req, res) => {
    submitassignmentModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
           
            res.render('submittedassignment', { items: items });
        }
    });
});


// Route to submitt the assignment by student
router.post('/submitassignment', middleWare.isLoggedIn, studentupload.single('image'), (req, res, next) => {



    var obj = {
        topic:req.body.topic,
        name: req.body.name,
        enrollment_no: req.body.enrollment_no,
        img: 'uploads/students/' + req.file.filename,
    }
    console.log(obj);

    User.findById(req.user._id, function (err, user) {
        submitassignmentModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                user.assignments.push(item);
                user.save();
                req.flash("success", "Successfuly submitted assignment ");
                res.redirect('/submitassignment');
            }
        });
    });
});


// MISLEneous
router.get("/quiz", middleWare.isLoggedIn, function (req, res) {
    res.render("experimentquiz");
});


router.get("/liveclass", middleWare.isLoggedIn, function (req, res) {
    res.render("experimentliveclass");
});







// show assignment
router.get("/assignment/:id", middleWare.isLoggedIn, async function (req, res) {

    // grab this assignment
    // grab all the work submitted for this assignment
    // var items = submitassignmentModel.find({ '_id': { $in: ids } });

    assignmentModel.findById(req.params.id, function (err, assignment) {
        if (err) {
            res.redirect("/assignment");
        } else {
            // submitassignmentModel.findById(assignment)
            // console.log(assignment)
            submitassignmentModel.find().where('_id').in(assignment.submittedassignments).exec((err, items) => {
                if (err)
                    console.log(err)
                else
                    console.log(items)
                res.render("assignmentdetails", { items: items, assignment: assignment });
            });
        }
    });
});


// submit work for this assignment
// Route to submitt the assignment by student
router.post('/assignment/:id/submit', middleWare.isLoggedIn, studentupload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        enrollment_no: req.body.enrollment_no,
        img: 'uploads/students/' + req.file.filename,
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
    assignmentModel.findById(req.params.id, function (err, assignment) {
        submitassignmentModel.create(obj, (err, item) => {
            if (err)
                console.log(err)
            else {
                console.log("Added to that assignment your work!!");
                assignment.submittedassignments.push(item);
                assignment.save();
                req.flash("success", "Successfuly submitted assignment ");
                res.redirect('/submitassignment');
            }
        });
    });
});


router.delete("/assignment/:id", function (req, res) {
    assignmentModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/assignment");
        } else {
            console.log("assignment deleted!!")
            res.redirect("/assignment");
        }
    });
});


module.exports = router;
