const express = require('express');
const app = express();
//requre question
let questions = require('./questions.json');
//use static contents
app.use(express.static('static'));
//ans will be used to keep a record of the final score
let ans= new Array(5).fill(0);

//get static html
app.get('/', (req,res) => { 
    res.sendFile(path.join(__dirname,'/static/index.html'))
})

//called from getQuestions
app.get('/quizQuestions', (req,res) => {
    qlist = JSON.parse(JSON.stringify(questions));
    for(var n in qlist)
    {
        delete qlist[n]["answerIndex"];
    }
    res.json(qlist);
})

//called from checkq function sending questions and answers
app.get('/checkq', (req, res) => {
    if(req.query.ans == questions[req.query.q]["answerIndex"])
    {
        ans[parseInt(req.query.q)] = 1;
        res.send([req.query.q, true])
    }
    else
    {
        ans[parseInt(req.query.q)]= 0;
        res.send([req.query.q, false])
    }
})

//called from getScore()
app.get('/getScore', (req,res) => {
    let grade= ((ans.reduce((a, b) => a + b, 0)));
    let result = grade;
    res.json(result);
})

app.listen(80);