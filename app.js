const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range =document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR ="black";
const CANVAS_SIZE =700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;    // 캔버스의 크기 설정

ctx.fillStyle = "white";    // canvas 기본이 흰색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //Sets the style for shapes' outlines.
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
   const x = event.offsetX;
   const y = event.offsetY;
   if(!painting){
       ctx.beginPath(); //하위 경로 목록을 비워 새 경로를 시작합니다. 새 경로를 만들려면이 메서드를 호출하십시오.
       ctx.moveTo(x,y); //새 하위 경로의 시작점을 (x, y) 좌표로 이동합니다.
       // 계속 처음 시작할 점을 갱신, 클릭하면 else로 넘어감 
   } else{
       ctx.lineTo(x, y); // 현재 하위 경로의 마지막 점을 지정된 (x, y) 좌표에 직선으로 연결합니다. 
       ctx.stroke();  //현재 스트로크 스타일로 현재 하위 경로를 스트로크합니다.
   }
}

// function onMouseDown(event){
//     painting = true;
// }

// function onMouseUp(event){
//   //  stopPainting();
// }

// function onMouseLeave(event){
//     stopPainting();
// }

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 캔버스 색상 갱신 override 됨
    ctx.fillStyle = color;  // filling 
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";    // html 글씨 바꿔줌
    }else{
        filling = true;
        mode.innerText = "Paint";

    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault(); // 우클릭 방지
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;  // 이미지 링크
    link.download = "paintJS";  // 이미지 이름
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick); 
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => // 여기서 color 는 array 안의 각각 아이템을 대표하는 것
    color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
