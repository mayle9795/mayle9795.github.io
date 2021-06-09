const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const { resolveSoa } = require('dns');

app.use(express.static('NerdLuv'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/signup-submit',(req,res)=>{
    let name = req.body.name;
    let gender = req.body.gender;
    let age = req.body.age;
    let persona = req.body.persona;
    let os = req.body.OS;
    let minage = req.body.minage;
    let maxage = req.body.maxage;
    let output = "\n" + name + "," + gender + "," + age + "," + persona + "," + os + "," + minage + "," + maxage;
    file = path.join(__dirname+'/singles.txt');
    fs.appendFile(file,output, (err) => {
        if (err) throw err;
    });
    res.write("<!DOCTYPE html>");
	res.write("<html>");
	res.write("<head>");
	res.write("<title>NerdLuv</title>");
    res.write("<meta charset='utf-8' />");
	res.write("<link href='/images/heart.gif' type='image/gif' rel='shortcut icon'/>");
	res.write("<link href='/nerdluv.css' type='text/css' rel='stylesheet' />");
    res.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js' type='text/javascript'></script>");
	res.write("<script src='/provided.js' type='text/javascript'></script>");
	res.write("</head>");
	res.write("<body>");
    res.write("<header>");
	res.write("<img src='/images/nerdluv.png' alt='banner logo' /> <br />");
	res.write("where meek geeks meet");
	res.write("</header>");
    res.write("<div>");
    res.write("<h1>Thank you!</h1>");
    res.write("<p>Welcome to NerdLuv, ");
    res.write(String(name) + "!");
    res.write("</p>");
    res.write("</p>Now <a href='/matches.html'>log in to see your matches!</a>");
    res.write("</p>");
    res.write("</div>");
    res.write("<p>");
    res.write("This page is for single nerds to meet and date each other!  Type in your personal information and wait for the nerdly luv to begin!  Thank you for using our site.");
    res.write("</p>");
    res.write("<footer>");
    res.write("<hr />");
    res.write("<p>");
    res.write("Results and page (C) Copyright NerdLuv Inc.");
    res.write("</p>");
    res.write("<ul>");
    res.write("<li>");
    res.write("<a href='/index.html'>");
    res.write("<img src='/images/back.gif' alt='icon' />");
    res.write("Back to front page");
    res.write("</a>");
    res.write("</li>");
    res.write("</ul>");
    res.write("</footer>");
    res.write("</body>");
    res.write("</html>");
    res.end();
});


let names = [];
let gender = [];
let age = [];
let persona = [];
let platform = [];
let minOfAge = [];
let maxOfAge = [];
let matches = []; 
let aLines;

filehandler = path.join(__dirname+'/singles.txt');
fs.readFile(filehandler, 'utf8', function (err,data) {
    if (err) console.log(err);
    
    aLines = data.split("\n");
    aLines.forEach(sLine => {
        let eachLine = sLine.split(",");
        names.push(eachLine[0]);
        gender.push(eachLine[1]);
        age.push(eachLine[2]);
        persona.push(eachLine[3]);
        platform.push(eachLine[4]);
        minOfAge.push(eachLine[5]);
        maxOfAge.push(eachLine[6]);
    });
    });

app.post('/matches-submit',(req,res)=>{
    let n = req.body.name;
    let index;

    names.forEach(element =>{
        if(element == n){
            index = names.indexOf(element);
            return index;
        }
    });

    for (let i = 0; i < gender.length; i++) {
        if(gender[i] != gender[index] && age[i] >= minOfAge[index] && age[i] <= maxOfAge[index] && platform[index] === platform[i] && samepersona(index, i) ){
            matches.push(aLines[i]);
        }
    }

    let dynamicContent = "<h1> Matches for " + String(n) + "</h1>";

    // handle loop here
    for(let k = 0; k < matches.length; k++){
        dynamicContent += "<div class='match'>";
		dynamicContent += "<p><img src='http://www.cs.washington.edu/education/courses/cse190m/12su/homework/4/images/user.jpg' alt='photo' />";
		let result = matches[k].split(',');
        dynamicContent += result[0];		
        dynamicContent += "</p>";
        dynamicContent += "<ul> <li><strong>gender: </strong>" + result[1] + "</li>";
        dynamicContent += "<li><strong>age: </strong>" + result[2] +"</li>";
        dynamicContent += "<li><strong>type: </strong>" + result[3] +"</li>";
        dynamicContent += "<li><strong>OS: </strong>" + result[4] +"</li>";
		dynamicContent += "</ul>";
        dynamicContent += "</div>";
    }
    

    let contentHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>NerdLuv</title>

            <meta charset="utf-8" />
            <link href="http://www.cs.washington.edu/education/courses/cse190m/12su/homework/4/images/heart.gif" type="image/gif" rel="shortcut icon" />
            <link href="http://www.cs.washington.edu/education/courses/cse190m/12su/homework/4/nerdluv.css" type="text/css" rel="stylesheet" />

        </head>

        <body>
            <header>
                <img src="http://www.cs.washington.edu/education/courses/cse190m/12su/homework/4/images/nerdluv.png" alt="banner logo" /> <br />
                where meek geeks meet
            </header>
            <div>

        ` +dynamicContent+ `


            </div>

            <p>
                This page is for single nerds to meet and date each other!  Type in your personal information and wait for the nerdly luv to begin!  Thank you for using our site.
            </p>
            <footer>
                <hr />
                <p>
                    Results and page (C) Copyright NerdLuv Inc.
                </p>

                <ul>
                    <li>
                        <a href="/index.html">
                            <img src="http://www.cs.washington.edu/education/courses/cse190m/12su/homework/4/images/back.gif" alt="icon" />
                            Back to front page
                        </a>
                    </li>
                </ul>
            </footer>
        </body>
    </html>`;
    res.write(contentHtml);
    res.end();
});


function samepersona(index, i){
   let char1 = persona[index].split('');
   let char2 = persona[i].split('');
   let count = 0;
   for(let k=0; k < char1.length; k++){
        if (char1[k] == char2[k]){
            count++;
        }
       
   }
   if (count >= 1) return true;
   return false;
}

var server = app.listen(3000, function(){
    console.log("Node server is running..");
});