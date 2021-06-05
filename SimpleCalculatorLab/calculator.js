exports.calculator = function(req,res,vals){
    let first = parseInt(vals.first);
    let operation = vals.operation;
    let second = parseInt(vals.second);
    let redirect = "http://localhost:8080/SimpleCalculatorLab/index.html";
    let answer;
    if(operation === "add"){
        answer = first + second;
    }
    else if(operation === "subtract"){
        answer = first - second;
    }
    else if(operation === "multiply"){
        answer = first * second;
    }
    else if (operation === "divide"){
        answer = first / second;
    }
    else {
        console.log("Cannot calculate with blank operation");
        
    }
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><meta charset=\"utf-8\"/>");
    res.write("<title>Calculator Web Site</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<p>The Answer is: ");
    res.write(String(answer));
    res.write("</p>");
    res.write("<a ")
    res.write("href=");
    res.write(redirect);
    res.write(">");
    res.write("<button>");
    res.write("Another Calculation");
    res.write("</button>");
    res.write("</a>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
};



