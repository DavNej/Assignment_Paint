
var colors = [
    "#f23e3e",
    "#f2983e",
    "#efe33e",
    "#77d83e",
    "#3ed8cb",
    "#3e81d8",
    "#793ed8",
    "#d83ed3"];

var selectedColor = 0;

function initCanvas(){
    var canvas = document.createElement('div');
    canvas.id = "canvas";
    canvas.style.backgroundColor = "white";
    // canvas.style.height = "50%";
    // canvas.style.width = "50%";
    canvas.addEventListener("mousemove", paintItUp)
    document.body.appendChild(canvas);
}

function initColor() {
    for (var i = 0; i < colors.length; i++){
        var newColor = document.createElement('div');
        newColor.classList.add('color');
        newColor.id = "color-" + (i+1);
        newColor.style.backgroundColor = colors[i];
        newColor.addEventListener("click", selectColor);
        document.getElementById('palette').appendChild(newColor);
    }
}

function selectColor(e) {
    if (selectedColor != e.target.id && selectedColor != 0){
        document.getElementById(selectedColor).style.border = "none";
        document.getElementById(selectedColor).style.width = "30px";
        document.getElementById(selectedColor).style.height = "30px";    
    }
    selectedColor = e.target.id;
    document.getElementById(selectedColor).style.border = "2px solid white";
    document.getElementById(selectedColor).style.width = "26px";
    document.getElementById(selectedColor).style.height = "26px";
}

//Brush features
function initBrushSize(){
    var brushSize = document.getElementsByClassName('brush')[1];
    brushSize.addEventListener("input", changeSize);
}
function changeSize(){
    var brush = document.getElementsByClassName('brush');
    brush[0].textContent = "Brush size\n" + brush[1].value + " px";
}
function getBrushSize(){
    return document.getElementsByClassName('brush')[1].value + "px";
}

function paintItUp(e){
    if (e.buttons == "1"){
        if (selectedColor === 0){
            alert("Please select a color first");
            return;
        }

        var x = e.clientX;
        var y = e.clientY;


        // var x = e.clientX - canvas.offsetLeft - getBrushSize()/2;
        // var y = e.clientY - canvas.offsetTop - getBrushSize()/2;

        console.log("(" + e.clientX + "," + e.clientY+ ")");
        console.log("(" + typeof e.clientX + "," + typeof e.clientY+ ")");

        var painted = document.createElement('div');
        painted.style.backgroundColor = document.getElementById(selectedColor).style.backgroundColor;
        painted.style.display = "inline-block";
        painted.style.position = "absolute";

        painted.style.width = getBrushSize();
        painted.style.height = getBrushSize();

        painted.style.left = x + "px";
        painted.style.top = y + "px";

        // painted.style.top = 

        canvas.appendChild(painted);
    }
}

function init() {
    initCanvas();
    initColor();
    initBrushSize()
}