var express  = require('express')
var router   = express.Router()
var passport = require('passport');
const middleWareObj = require('../middleware');
var middleWare = require("../middleware")
// var Teacher    = require("../models/Teacher")
// var Student    = require("../models/Teacher")
var User     = require("../models/user")



// cheking authorization route.
router.get("/",middleWare.isLoggedIn, function (req, res) {
    res.render("home")
});


// REGISTER
router.get("/register",function(req,res){
    res.render("register");
});



// register post
// -------------
router.post("/register", function(req,res){

    var newUser = new User({username: req.body.username, type:req.body.user});
    
    User.register(newUser,req.body.password, function(err,user){
        // the user will be the newly created user
        if(err){
            // req.flash("error", err.message);
            // console.log(err)
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            // req.flash("success", "Welcome to Connect " + user.username+"!");
            res.redirect("/");
        }) ;
    });
});



// login 
router.get("/login",function(req,res){
    res.render("login"); 
});

// login logic
router.post("/login",passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "/login"
}),
function(req,res){

    // console.log("Logged in as : ")
    // console.log(req.sessionStore);
});

// logout
router.get("/logout", function(req,res){
    var sessions = req.sessionStore.sessions;
    req.logout();
    res.redirect("/login");
});


module.exports = router;