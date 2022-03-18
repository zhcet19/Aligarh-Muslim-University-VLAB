var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  indexPage = require("./routes/index"),
  assignmentPage = require("./routes/assignment")
  quizPage = require("./routes/quiz")
  path = require('path'),
  fs = require('fs'),
  multer = require('multer'),
  methodOverride = require("method-override"),
  app = express(),
  assignmentModel = require('./models/assignment'),
  submitassignmentModel = require('./models/submitassignment'),
  quizModel = require('./models/quiz');
  flash = require("connect-flash");
  const PORT = process.env.PORT || 8000;

// auth imports
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');


// mongo config
const MONGODB_URL = 'mongodb+srv://AMU_VLAB_ADMIN:ZVL1vxcOIdbJ2VkH@cluster0.5csqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


// app.use exps
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());

// express session
app.use(require('express-session')({
  secret: "The snake is flying on pencil nose!!",
  resave: false,
  saveUninitialized: false
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  // console.log(res.locals.currentUser);  
  next();
});

// getting routes form routes dir
app.use(indexPage);

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
app.use(function (req, res, next) {
  if (!req.body["expvalue"])
    next();
  else {
    res.locals.expname = req.body["expvalue"];
    next();
  }
});


// assignment routes!
app.use(assignmentPage)
//Downloading the assignment
app.get('/download/:id', (req, res) => {
  assignmentModel.find({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.log(err)
    }
    else {
      var path = __dirname + '/public/' + item[0].img;
      res.download(path);
    }
  });

});

app.get('/downloadsubmittedassignment/:id',(req,res)=>{  
  submitassignmentModel.find({_id:req.params.id},(err,item)=>{  
     if(err){  
          console.log(err)  
      }   
      else{  
         var path= __dirname+'/public/'+item[0].img;  
        res.download(path);  
      }  
  });

});  

app.get("/assignment/:id", function (req, res) {
  assignmentModel.findById(req.params.id, function (err, assignment) {
    if (err) {
      res.redirect("/assignment");
    } else {
      res.render("assignmentdetails", { assignment: assignment });
    }
  })

  app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });

});


app.delete("/assignment/:id", function (req, res) {
  assignmentModel.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/assignment");
    } else {
      res.redirect("/assignment");
    }
  })

});
app.delete("/submitassignment/:id", function (req, res) {
  submitassignmentModel.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/submitassignment");
    } else {
      res.redirect("/submitassignment");
    }
  })

});

app.use(quizPage);
mongoose.connection.on("connected", () => {
  console.log("connected");
});


app.listen(PORT, function () {
  console.log("Welcome you to AMUVLAB");
});


module.exports = app;