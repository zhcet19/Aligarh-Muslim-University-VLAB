var express  = require('express')
var router   = express.Router()
var middleWare = require("../middleware")
var express  = require('express')
var router   = express.Router()
var questionsModel = require("../models/quiz");
// initialize variables 
var questions = [],
    answers = [],
    i = 0;

// Quiz API Routes (/quiz)

router.get("/quiz",middleWare.isLoggedIn, function (req, res) {
    res.render("experimentquiz");
});

router.get('/quiz/questions',middleWare.isLoggedIn,(req, res, next) => {
    questionsModel.aggregate([{$sample: {size: 10}}])
.then(data => {
    if(data.length) {
       questions = data;
           answers = [];
       res.render('quizquestions',{question:questions[0].question,options:questions[0].options});
    } else
    {
        res.render(404);
    }
})
.catch(err => {
    console.log(err); 
}) } );

// Quiz API Routes (/quiz/add)
router.get('/addquiz',middleWare.isLoggedIn,(req,res,next)=>{
   questionsModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('questionframe', { items: items }); 
        } 
    }); 
})

router.post('/addquiz',middleWare.isLoggedIn, (req, res, next) => {
    var options= [req.body.option1,req.body.option2,req.body.option3,req.body.option4];
    var obj={
        question:req.body.question,
        options:options,
        answer:req.body.answer
    }
    console.log(req.body);
  
    questionsModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            
            req.flash("success" , "Successfuly added viva ");
            res.redirect('/addquiz');
        } 
    }); 

});

// Quiz API Routes (/quiz/next)
router.post('/quiz/next',middleWare.isLoggedIn, (req,res,next)=>{
    console.log("questions", questions);
  i = i + 1;
  if(req.body.optradio){
      if(i <= questions.length) {
          answers.push(req.body.optradio);
      }
       if(i < questions.length){
      res.render('quizquestions',{question:questions[i].question,options:questions[i].options});
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
           res.render('scorequiz',{score:score,total:questions.length,wrong:wrong})
       }
  } 
});

// Export this Module
module.exports = router;
