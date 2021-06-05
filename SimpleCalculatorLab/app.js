var http = require('http');
var url = require('url');
var fs = require('fs');
var calculator = require('./calculator.js');

// function renderHtml(res, data) {
//     return res.end("<div>"+data[0]+"</div>");
// }

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    

    if (filename == "./") {
        res.writeHead(302, {
            'Location': 'SimpleCalculatorLab/index.html'
          });
        return res.end();
    }

    if (q.pathname=="/cal.js")
        calculator.calculator(req,res,q.query)
    else {
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }

            res.writeHead(200); // Content-Type not included
            res.write(data);
            return res.end();
        });
    }

}).listen(8080);