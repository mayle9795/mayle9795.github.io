const { exception } = require("console");

let quiz1 = [3,1,4,1,5];
let quiz2 = [1,1,2,3,5];
let quiz3 = [1,4,9,16,25];
let quiz4 = [2,3,5,7,11];
let quiz5 = [1,2,4,8,16];
var quizzes = [quiz1,quiz2,quiz3,quiz4,quiz5];
var answers = [9,8,36,13,32];
var i = 0;
var score = 0;
var numbers = quizzes[i];
var value;

exports.response = function (req,res,vals){
    value = parseInt(vals.value);
    if(i < answers.length - 1){
        if(value == answers[i]){
            score ++;
        }
        i++;
        numbers = quizzes[i];
        show(req,res);
    }

    else{
        if(value==answers[i]) score++;
        exit(req,res);
        score = 0;
        i = 0;
        numbers = quizzes[i];

    }
    
    return res.end();
   
};

var show =function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Quiz Lab</title>");
    res.write("<style>");
    res.write(".container {");
    res.write("margin-top: 50px;");
    res.write("margin-left: 50px;");
    res.write("width: 500px;");
    res.write("border: 1px black solid;");
    res.write("height: 300px;}");       
    res.write(".box{padding-left: 15px;}");    
    res.write("</style>");
    res.write("</head>");
    res.write("<body>");
    res.write("<div ");
    res.write("class = 'container'>");
    res.write("<form action = 'http://localhost:8080/submit.js'>");
    res.write("<div class = 'box'>");
    res.write("<h1>The Number Quiz</h1>");
    res.write("<p>Your current score is ");
    res.write(String(score));
    res.write("</p>");
    res.write("<p>Guess the number in the sequence</p>")
    res.write("<p>");
    res.write(String(numbers));
    res.write("</p>")
    res.write("<label>Your answer is: </label>");
    res.write("<input type = 'text' name='value' size =7 /></br></br>");
    res.write("<input type='submit' value='Submit'/>");
    res.write("</div>");
    res.write("</form>");   
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
};

exports.show = show;

var exit = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Quiz Lab</title>");
    res.write("<style>");
    res.write(".container {");
    res.write("margin-top: 50px;");
    res.write("margin-left: 50px;");
    res.write("width: 500px;"); 
    res.write ("border: 1px black solid;");
    res.write("height: 150px;");
    res.write("padding-left: 20px;");
    res.write("}");
    res.write("</style>");
    res.write("</head>");
    res.write("<body>");
    res.write("<div class = 'container'>");
    res.write("<h1>The Number Quiz</h1>");
    res.write("<p>Your current score is ");
    res.write(String(score));
    res.write("</p>");
    res.write("<p>You have completed the Number Quiz, with a score of ");
    res.write(String(score));
    res.write(" out of 5</p>");
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
}