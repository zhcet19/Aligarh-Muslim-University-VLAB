var express= require("express");
var bodyParser= require("body-parser");

var app= express();


app.set("view engine","ejs");

app.get("/",function(req,res){

  // res.json("trial");
  res.send("home")

});


app.listen(3000, function(){
    console.log("Welcome you to AMUVLAB");
  });