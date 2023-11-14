const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const clear_button = document.getElementById('clear_button');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

clear_button.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let isDrawing = false;

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}