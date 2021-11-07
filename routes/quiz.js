var express  = require('express')
var router   = express.Router()
var middleWare = require("../middleware")
var express  = require('express')
var router   = express.Router()
var questionsModel = require("../models/quiz");
// initialize variables 
var questions = [];
var answers = [];
var i=0;

   

// Quiz API Routes (/quiz)

router.get("/quiz/:number",middleWare.isLoggedIn, function (req, res) {
    var experimentnumber=req.params.number;
    console.log(experimentnumber);
    res.render("experimentquiz",{experimentnumber:experimentnumber});
});

router.get('/quiz/questions/:number',middleWare.isLoggedIn,(req, res, next) => {
    var experimentnumber=req.params.number;
    console.log(experimentnumber);
    questionsModel.aggregate([{$sample: {size: 10}}])
.then(data => {
    if(data.length) {
    
       questions = data;
           answers = [];
       res.render('quizquestions',{question:questions[0].question,options:questions[0].options,quizno:questions[0].quizno,experimentnumber:experimentnumber});
    } else
    {
        res.render(404);
    }
})
.catch(err => {
    console.log(err); 
}) } );

// Quiz API Routes (/quiz/add)
router.get('/quiz/addquiz/:number',middleWare.isLoggedIn,(req,res,next)=>{
    var quiznumber=req.params.number;
   questionsModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('questionframe', { items: items,quiznumber:quiznumber }); 
        } 
    }); 
})

router.post('/quiz/addquiz/:number',middleWare.isLoggedIn, (req, res, next) => {
    var options= [req.body.option1,req.body.option2,req.body.option3,req.body.option4];
    var quiznumber=req.params.number;
    var obj={
        question:req.body.question,
        options:options,
        answer:req.body.answer,
        quizno:quiznumber
    }
    console.log(req.body);
  
    questionsModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            
            req.flash("success" , "Successfuly added viva ");
            res.redirect('/quiz/addquiz/'+ quiznumber);
        } 
    }); 

});

// Quiz API Routes (/quiz/next)
router.post('/quiz/next/:number',middleWare.isLoggedIn, (req,res,next)=>{
    console.log("questions", questions);
   var experimentnumber=req.params.number;
  i = i + 1;
  if(req.body.optradio){
      if(i <= questions.length) {
          answers.push(req.body.optradio);
      }
       if(i < questions.length){
      res.render('quizquestions',{question:questions[i].question,options:questions[i].options,quizno:questions[i].quizno,experimentnumber:experimentnumber});
       } else {
           i=0;
           var score = 0;
           var wrong=0;
           for(let j = 0 ; j < questions.length; j++) {
                if(questions[j].answer == answers[j])
                {
                    score = score + 1;
                }
           } 
           wrong=questions.length-score;
           res.render('scorequiz',{score:score,total:questions.length,wrong:wrong,experimentnumber:experimentnumber})
       }
  } 
});

// Export this Module
module.exports = router;
