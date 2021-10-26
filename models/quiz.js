const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: Array,
    answer: Number
});

module.exports = new mongoose.model('Question', QuestionSchema)