
var colors = [
    "#f23e3e",
    "#f2983e",
    "#efe33e",
    "#77d83e",
    "#3ed8cb",
    "#3e81d8",
    "#793ed8",
    "#d83ed3",
    "#000000",];

var selectedColor = 0;
var filling = 0;
var canvasWidth = 500;
var canvasHeight = 300;

function initCanvas(){
    var canvas = document.createElement('div');
    canvas.id = "canvas";
    canvas.style.backgroundColor = "white";
    canvas.addEventListener("mousemove", paintItUp)
    document.body.appendChild(canvas);

    var caption = document.createElement('p');
    caption.classList.add('brush');
    caption.textContent = "Size";
    document.getElementById('menu').appendChild(caption);

    var decrease = document.createElement('button');
    decrease.textContent = "-";
    decrease.style.display = 'inline-block';
    decrease.style.width = "30px";
    decrease.addEventListener("click", sizeMinus);
    document.getElementById('menu').appendChild(decrease);

    var increase = document.createElement('button');
    increase.textContent = "+";
    increase.style.display = 'inline-block';
    increase.style.width = "30px";
    increase.style.marginLeft = "7px";
    increase.addEventListener("click", sizePlus);
    document.getElementById('menu').appendChild(increase);
}

function sizePlus(){
    if (canvasWidth < 1000 && canvasHeight < 600){
        canvasWidth +=50;
        canvasHeight +=30;
    }

    document.getElementById('canvas').style.width = canvasWidth + "px";
    document.getElementById('canvas').style.height = canvasHeight + "px";
}

function sizeMinus(){
    if (canvasWidth > 500 && canvasHeight > 300){
        canvasWidth -=50;
        canvasHeight -=30;
    }

    document.getElementById('canvas').style.width = canvasWidth + "px";
    document.getElementById('canvas').style.height = canvasHeight + "px";

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
    var eraser = document.createElement('div');
        eraser.classList.add('tool');
        eraser.id = "eraser";
        eraser.style.backgroundImage = "url(./images/eraser.png)";
        eraser.addEventListener("click", selectColor);
        document.getElementById('palette').appendChild(eraser);
}

function selectColor(e) {
    if (selectedColor == document.getElementById('color-picker').value){
        selectedColor = 0;
    }
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
    return document.getElementsByClassName('brush')[1].value;
}

//Shape features
function shape(){
    this.init = function() {
        var caption = document.createElement('p');
        caption.classList.add('brush');
        caption.textContent = "Shape";
        document.getElementById('tools').appendChild(caption);

        var shape = document.createElement('div');
        shape.id = "shape";
        shape.classList.add('tool');
        shape.style.display = "block";
        shape.style.backgroundImage = "url(./images/square.png)";
        shape.addEventListener("click", this.changeShape);
        document.getElementById('tools').appendChild(shape);
    }
    this.changeShape = function(e) {
        if (document.getElementById('shape').style.backgroundImage == "url(\"./images/square.png\")"){
            document.getElementById('shape').style.backgroundImage = "url(./images/round.png)";
        }
        else{
            document.getElementById('shape').style.backgroundImage = "url(./images/square.png)";
        }
    }
    this.getShape = function(HTML_element) {
        if(document.getElementById('shape').style.backgroundImage == "url(\"./images/round.png\")"){
            return HTML_element.style.borderRadius = getBrushSize() + "px";
        }
    }
}

//Painting
var roundOrSquare = new shape();

function paintItUp(e){
    if (e.buttons == "1"){
        if (selectedColor === 0){
            alert("Please select a color first");
            return;
        }

        var x = e.clientX - canvas.offsetLeft - getBrushSize()/2;
        var y = e.clientY - canvas.offsetTop - getBrushSize()/2;

        //console.log("(" + e.clientX + "," + e.clientY+ ")");

        var painted = document.createElement('div');
        roundOrSquare.getShape(painted);

        if(selectedColor == 'eraser'){
            painted.style.backgroundColor = document.getElementById('canvas').style.backgroundColor;
        }
        else if (selectedColor.indexOf('color') == -1){
            painted.style.backgroundColor = selectedColor;
        }
        else{
            painted.style.backgroundColor = document.getElementById(selectedColor).style.backgroundColor;
        }
        
        painted.style.display = "inline-block";
        painted.style.position = "absolute";

        painted.style.width = getBrushSize() + "px";
        painted.style.height = getBrushSize() + "px";

        painted.style.left = x + "px";
        painted.style.top = y + "px";

        canvas.appendChild(painted);
    }
}

//create save an load buttons
function initButtons(){
    var save = document.createElement('button');
    save.textContent = "Save";
    save.style.display = 'block';
    save.style.width = "67px";
    save.style.marginTop = "10px";
    save.addEventListener("click", saveCanvas);
    document.getElementById('menu').appendChild(save);

    var load = document.createElement('button');
    load.textContent = "Load";
    load.style.display = 'block';
    load.style.width = "67px";
    load.addEventListener("click", loadCanvas);
    document.getElementById('menu').appendChild(load);
}

function saveCanvas(){
    var name = prompt("Save painting as :");
    localStorage[name] = document.getElementById('canvas').innerHTML;
}

function loadCanvas(){
    var name = prompt("Name of the painting:");
    document.getElementById('canvas').innerHTML = localStorage[name];
}

function initFill(){
    var fill = document.createElement('div');
    fill.id = "fill";
    fill.classList.add('tool');
    fill.style.backgroundImage = "url(./images/fill.png)";
    fill.addEventListener("click", fillIt);
 //  fill.addEventListener("click", selectTool);
    document.getElementById('tools').appendChild(fill);
}

function initClear(){
    var clear = document.createElement('div');
    clear.id = "clear";
    clear.classList.add('tool');
    clear.style.backgroundImage = "url(./images/clear.ico)";
    clear.addEventListener("click", function(){document.getElementById('canvas').innerHTML = "";});
    document.getElementById('tools').appendChild(clear);
}

function fillIt(e){
    if (e.buttons == "1" && e.target.id == 'canvas'){
        console.log('test')
    }
}

function initColorPicker(){
    var colorPicker = document.createElement('input');
    colorPicker.id = "color-picker";
    colorPicker.type = "color";
    colorPicker.style.width = "60px";
    colorPicker.style.height = "30px";
    colorPicker.value = "#88c2fc";
    colorPicker.addEventListener("blur", colorFromPicker);
    colorPicker.addEventListener("click", deselect);
    document.getElementById('palette').appendChild(colorPicker);
}

function deselect(e){
    if (selectedColor != 0 && selectedColor !== e.target.value){
        document.getElementById(selectedColor).style.border = "none";
        document.getElementById(selectedColor).style.width = "30px";
        document.getElementById(selectedColor).style.height = "30px";    
    }
}

function colorFromPicker(e){
    selectedColor = e.target.value;
}

function init() {
    initCanvas();
    initColor();
    initColorPicker();
    initBrushSize();
    roundOrSquare.init();
    initFill();
    initClear();
    initButtons();
}