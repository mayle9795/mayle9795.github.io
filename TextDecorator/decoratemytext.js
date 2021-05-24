window.onload = () => {    
    let txtarea = document.getElementById("text");

    let btnDecorate = document.getElementById("decorate");
    btnDecorate.onclick = () => {                
        setInterval(decorate, 500, txtarea);
    };

    let cbBling = document.getElementById("bling");
    cbBling.onchange = () => {
        if (cbBling.checked){
            txtarea.style.fontWeight = "bold";   
            txtarea.style.textDecoration = "underline";
            txtarea.style.color = "green";
        }
        else {
            txtarea.style.fontWeight = "";   
            txtarea.style.textDecoration = "";
            txtarea.style.color = "";
        }
    };

}

function decorate(element){
    let curr = parseInt(element.style.fontSize);
    if (isNaN(curr)) curr = 12;
    element.style.fontSize = curr + 2 + "pt";
}

function blingText(element) {
    element.style.fontWeight = "bold";   
}