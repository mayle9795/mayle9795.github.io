const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var lookUp = require("./word.js");

app.use(express.static('Dictionary'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/dict.html'));
});

app.post('/lookUp',(req,res)=>{
    let w = req.body.word;
    lookUp.getDefinitions(req,res,w); 
});

var server = app.listen(28888, function(){
    console.log("Node server is running..");
});
