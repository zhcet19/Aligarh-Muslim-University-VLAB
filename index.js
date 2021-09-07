var express = require("express");
var bodyParser = require("body-parser");

var app = express();

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

// app.use exps
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req,res,next){
  if(!req.body["expvalue"])
    next();
  else{
    res.locals.expname = req.body["expvalue"];
    next();
  }
});


app.get("/", function (req, res) {
  res.render("home");
});


app.get("/experiment", function (req, res) {
  res.render("experimentmenu" , {experiments :experiments });
});


app.get("/index", function (req, res) {
  res.render("experimentindex");
});





app.get("/theory", function (req, res) {
  res.render("experimenttheory");
});


app.get("/procedure", function (req, res) {
  res.render("experimentprocedure");
});

app.get("/assignment", function (req, res) {
  res.render("experimentassignment");
});

app.get("/quiz", function (req, res) {
  res.render("experimentquiz");
});

app.get("/liveclass", function (req, res) {
  res.render("experimentliveclass");
});

app.get("/experiment1", function (req, res) {
  res.render("experiments/experiment1");
});

app.listen(2000, function () {
  console.log("Welcome you to AMUVLAB");
});
