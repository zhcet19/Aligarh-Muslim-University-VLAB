var express= require("express");
var bodyParser= require("body-parser");

var app= express();


app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));

app.get("/",function(req,res){

  res.render("home");
 

});
app.get("/experiment",function(req,res){

  res.render("experimentmenu");
});

app.get("/index",function(req,res){
  res.render("experimentindex");
})

app.get("/theory",function(req,res){
  res.render("experimenttheory");
})

app.get("/procedure",function(req,res){
  res.render("experimentprocedure");
})
app.get("/assignment",function(req,res){

  res.render("experimentassignment");
})
app.get("/quiz",function(req,res){

  res.render("experimentquiz");
})
app.get("/liveclass",function(req,res){

  res.render("experimentliveclass");
})

app.get("/experiment1",function(req,res){

  res.render("experiments/experiment1")
});
app.listen(2000, function(){
    console.log("Welcome you to AMUVLAB");
  });