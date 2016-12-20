
var colors = [
    "#f23e3e",
    "#f2983e",
    "#efe33e",
    "#77d83e",
    "#3ed8cb",
    "#3e81d8",
    "#793ed8",
    "#d83ed3"];

function createCanvas(){
    var canvas = document.createElement('div');
    canvas.id = "canvas";
    canvas.style.backgroundColor = "white";
    // canvas.style.height = "50%";
    // canvas.style.width = "50%";
    document.body.appendChild(canvas);
}

function createColor() {
    for (var i = 0; i < colors.length; i++){
        var newColor = document.createElement('div');
        newColor.classList.add('color');
        newColor.style.backgroundColor = colors[i];
        document.getElementById('menu').appendChild(newColor);
    }
}


function init() {
    createCanvas();
    createColor();
}