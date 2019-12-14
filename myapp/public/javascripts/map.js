const canvas = document.getElementById('canvas');

const w = 400;
const h = 400;
// canvas.width = w;
// canvas.height = h;
// canvas.style.width = `${w}px`;
// canvas.style.height = `${h}px`;
//
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
// ctx.strokeRect(10, 30,10, 10);
let x = 0;

function draw() {

    ctx.clearRect(0,0,document.getElementById('canvas').clientWidth,document.getElementById('canvas').clientHeight);
    ctx.fillRect(x++,50, 100, 100);

    window.requestAnimationFrame(draw);
}

// draw();

canvas.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY);
    ctx.strokeRect(e.clientX-60, e.clientY-160,10, 10);

});
