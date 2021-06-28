const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const range = document.getElementById("jsRange");
const paintMode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

canvas.width = 700;
canvas.height = 700;

const DEFAULT_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = DEFAULT_COLOR;
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function handleColorClick(event){
    const pickColor = event.target.style.backgroundColor;
    ctx.strokeStyle = pickColor;
    ctx.fillStyle = pickColor;
}
function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        paintMode.innerText ="Fill";
    } else{
        filling = true;
        paintMode.innerText ="Paint";
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}
function handleContextMenu(event){
    event.preventDefault();
}

function handleClickSave(event){
    const data = canvas.toDataURL("image, png");
    const link = document.createElement("a");
    link.href = data; 
    link.download ="my_paint";  //파일명 정하기
    link.click(); 
}
function handleClickClear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(paintMode){
    paintMode.addEventListener("click", handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", handleClickSave);
}
if(clearBtn){
    clearBtn.addEventListener("click", handleClickClear);
}