let word;
let list;
let flag = 0;

$(document).ready(function(){
    $("#lookup").click(function(){
        if(flag == 1) return;

        flag = 1;
        findWord();
    });
});

function findWord(){
    word = $("#word").val();

    let dataPost = {word: word};

    $.post("http://localhost:28888/lookUp", dataPost,function(data){
        if(data === "[]"){
            $("#results ol").html("No definition");
            flag = 0;
            return;
        }
        console.log(data);
        let d = JSON.parse(data);
        console.log(d);
        printDefinition(d);
        flag = 0;
    });
};



function printDefinition(output){
    let temp;
    let outputText = "";

    output.forEach(element => {
        temp = "(" + element.wordType + " )" + " :: " + element.definition;
        list = "<li>" + temp + "</li>" + "</br>";
        outputText += list;
        
    });

    $("#results ol").html(outputText);
}

