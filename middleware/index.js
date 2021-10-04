var express  = require('express')
var router   = express.Router()
var passport = require('passport');
// Middleares here
var middleWareObj = {};



middleWareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        // console.log("check if teacher is signed in isloggedin!!");
            return next();
    }
    res.redirect("/login");
}


module.exports = middleWareObj

















