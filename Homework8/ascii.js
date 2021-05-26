// get elements DOM.
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let animationSelection = document.getElementById("animation");
let sizeSelection = document.getElementById("size");
let turboCheckbox = document.getElementById("turbo");
let textarea = document.getElementById("textarea");

// get values
let animationValue = animationSelection.value;
let isTurbo = turboCheckbox.checked;

//init values
let listAnimations = [""];
let speed = 250;
let intervalHandler;
let startIndex, endIndex;
let isRunning;

//handle events
startBtn.onclick = handlePlay;
stopBtn.onclick = handleStop;
animationSelection.onchange = handleAnimationChange;
turboCheckbox.onchange = handleTurboChange;
sizeSelection.onchange = handleSizeChange;


function handlePlay(){
    isRunning = true;
    handleControl(true);
    speed = isTurbo ? 50: 250;

    startIndex = 0;
    endIndex = listAnimations.length;

    intervalHandler = setInterval(() => {
        if(startIndex == endIndex) {
            startIndex = 0;
        }
        textarea.value = listAnimations[startIndex++];
    }, speed);
}


function handleStop(){
    isRunning = false;
    clearInterval(intervalHandler);
    // reset control
    handleControl(false);
    // reset text area, show all animation
    resetTextArea();
}

function handleAnimationChange(){
    animationValue = animationSelection.value;
    listAnimations = ANIMATIONS[animationValue].split("=====\n");
    textarea.value = listAnimations[0];
}

function handleTurboChange(){
    if(!isRunning){return;}
    isTurbo = turboCheckbox.checked;
    speed = isTurbo? 50 : 250;
    clearInterval(intervalHandler);
    intervalHandler = setInterval(function(){
        if(startIndex == endIndex){
            startIndex = 0;
        }
        textarea.value = listAnimations[startIndex++];
     },speed);
}


function handleSizeChange(){
    textarea.style.fontSize = sizeSelection.value;
}

function resetTextArea(){
    textarea.value = ANIMATIONS[animationValue];
}

function handleControl(isEnable) {
    if (isEnable ) { //playing
        startBtn.disabled = true;
        stopBtn.disabled = false;
        animationSelection.disabled = true;
    } 
    else { //stop
        startBtn.disabled = false;
        stopBtn.disabled = true;
        animationSelection.disabled = false;
    }
}

