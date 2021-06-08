var mysql = require('mysql');
var connected = false;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"entries"
});


con.connect(function(err){
    if(err) throw err;
    connected = true;
});



exports.getDefinitions = function(req,res,w){
    let query = 'SELECT wordType, definition FROM entries WHERE word = '+ mysql.escape(w);

    if(connected){
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    }
    else{
        con.connect(function(err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                res.end(JSON.stringify(result));
            });
             
        });
    }

};




