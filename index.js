var express= require("express");
var bodyParser= require("body-parser");

var app= express();


app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));

app.get("/",function(req,res){

  res.render("home");
 

});
app.get("/experiment1",function(req,res){

  res.render("experiments/experiment1")
});

app.listen(2000, function(){
    console.log("Welcome you to AMUVLAB");
  });