
var space = 15;
var upOrDown = 4;
var leftOrRight = 1;

$(document).ready(function(){
    init();
    $(".puzzlepiece").each(function () {
        $(this).click(puzzleOnClick);
        $(this).mouseover(puzzleOnHover);
        $(this).mouseleave(puzzleOnLeave);
    });
    // $("#shufflebutton").click(shuffle);

});

let init = function() {
    var puzzleArea = document.getElementById('puzzlearea');
    var divs = puzzleArea.getElementsByTagName("div");
      
    // initialize each piece
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        
        // calculate x and y for this piece
        var x = ((i % 4) * 100) ;
        var y = (Math.floor(i / 4) * 100) ;

        // set basic style and background
        div.className = "puzzlepiece";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("background.jpeg")';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
        
        // store x and y for later
        div.x = x;
        div.y = y; 
    }        
};
function available (currentposition){
    currentposition = parseInt(currentposition);
    console.log("Check availability");
    console.log(currentposition);
    console.log(space);
    if(currentposition + upOrDown == space || 
        currentposition - upOrDown == space||
        currentposition + leftOrRight == space||
        currentposition - leftOrRight == space){
        console.log("available");
        return true;
        }
    console.log("Not available");
    return false;
   
}

function puzzleOnHover(){
    $(".puzzlepiece").css('cursor', 'pointer');
    let myPos = $(this).index();
    console.log(myPos);
    let tmp = available(myPos);
    if(tmp == true){
        $(this).css("border",("5px solid red"));
    }
}


function puzzleOnLeave() {
    $(this).css("border", "5px solid black");
}

function puzzleOnClick(){
    let curPos = $(this).index();
    console.log(curPos);
    if (available(curPos) == true) {
        moveSquare(this, space, true);
        this.pos= space;
        console.log("Position " + this.pos);
        space = curPos;
    } else {
        console.log("Cant move this square");
    }

}

function moveSquare(div, i, animate = false) {
    // calculate x and y for this piece
    var x = ((i % 4) * 100);
    var y = (Math.floor(i / 4) * 100);

    if (animate) {
        if (y == div.y && x > div.x) {
            $(div).animate({
                "left": x + 'px'
            }, "fast");
        } else if (y == div.y && x <= div.x) {
            $(div).animate({
                "left": x + 'px'
            }, "fast");
        } else if (x == div.x && y > div.y) {
            $(div).animate({
                "top": y + 'px'
            }, "fast");
        } else {
            $(div).animate({
                "top": y + 'px'
            }, "fast");
        }
    } else {
        $(div).css("left", x + 'px');
        $(div).css("top", y + 'px');
    }
    // store x and y and pos
    div.x = x;
    div.y = y;
    div.pos = i;
}




