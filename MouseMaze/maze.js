var isTouch = false;
var isGameStart = false;

$(document).ready(function () {
    $("#maze>div.boundary").mouseover(function () {
        youloseHover();
    });

    $("#maze").mouseleave(function () {
        youloseHover();
    });

    $("div#start").click(function () {
        reset();
        $("#status").html("Game On!");
    });

    $("div#start").mouseover(function () {
        $(this).css("cursor", "pointer");
    });

    $("div#end").mouseover(function () {
        end();
    });
});

function youloseHover() {
    if (isGameStart) {
        isTouch = true;
        $("#maze>div.boundary").addClass("youlose");
        $("#status").html("Sorry, you lost. :[");
    }
}

function end() {
    if (isGameStart == false) return;
    if (isTouch == false) {
        alert("You win!");
        $("#status").html("Click the \"S\" to begin.");
    }
    isGameStart = false;
}

function reset() {
    $("#maze>div.boundary").removeClass("youlose");
    $("#status").html("Click the \"S\" to begin.");
    isTouch = false;
    isGameStart = true;
}