
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
    canvas.addEventListener("click", paintItUp)
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
    selectedColor = e.target.id;
    console.log(selectedColor);
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
    if (selectedColor === 0){
        alert("Please select a color first");
        return;
    }
    console.log(e.pageX);
    var painted = document.createElement('div');
    painted.style.backgroundColor = document.getElementById(selectedColor).style.backgroundColor;
    painted.style.display = "inline-block";
    painted.style.display = "absolute";

    painted.style.width = getBrushSize();
    painted.style.height = getBrushSize();


    // painted.style.top = 

    canvas.appendChild(painted);
}

function init() {
    initCanvas();
    initColor();
    initBrushSize()
}