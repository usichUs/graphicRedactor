//Глобальные переменные кисти
let isDrawing = false;
let isEraser = false;
let isRectangle = false;
let isTriangle = false;
image_id = 0;

//Холст
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Кнопки Меню
const clear_button = document.getElementById('clear_button');
const eraser_button = document.getElementById('eraser_button');
const triangle_button = document.getElementById('triangle_button');
const rectangle_button = document.getElementById('rectangle_button');
const download_button = document.getElementById('download_button');
const save_button = document.getElementById('save_button');
const settings_button = document.getElementById('settings_button');
const image_input = document.getElementById('imageInput');
const pop_up = document.getElementById('pop_up');
const stroke_size = document.getElementById('slider');
const color = document.getElementById('color');
const pop_up_setting = document.getElementById('pop_up_setting');

//Работа с холстом
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

//Обработчики событий кнопок меню
clear_button.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

eraser_button.addEventListener('click', () => {
    eraser_button.classList.toggle('icon_active');
    isEraser = !isEraser;
})

triangle_button.addEventListener('click', () => {
    triangle_button.classList.toggle('icon_active');
    isTriangle = !isTriangle;
})

rectangle_button.addEventListener('click', () => {
    rectangle_button.classList.toggle('icon_active');
    isRectangle = !isRectangle;
})

save_button.addEventListener('click', () => {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-${image_id++}.png`;
    a.click();
})

download_button.addEventListener('click', () => {
    pop_up.classList.toggle('pop_up_active');
})

image_input.addEventListener('change', handleImage, false);

settings_button.addEventListener('click', () => {
    pop_up_setting.classList.toggle('pop_up_active');
})
function handleImage(e) {
    var reader = new FileReader();

    reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        // Растягиваем изображение на весь холст
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    pop_up.classList.remove('pop_up_active');
  }
//Функции рисования
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Нарисовать треугольник
function drawTriangle(e) {
    ctx.strokeStyle = 'green';
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x-100, y + 100);
    ctx.lineTo(x + 100, y + 100);
    ctx.closePath();
    ctx.stroke();
 }
 
 // Нарисовать прямоугольник
 function drawRectangle(e) {
    ctx.strokeStyle = 'red';
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.rect(x, y, 100, 100);
    ctx.stroke();
 }

//  function draw(e) {
//     if (!isDrawing) return;

//     if (isEraser) {
//         ctx.strokeStyle = '#fff';
//         ctx.lineWidth = 10;
//     } else if (isRectangle) {
//         drawRectangle(e);
//         return;
//     } else if (isTriangle) {
//         drawTriangle(e);
//         return;
//     } else {
//         ctx.strokeStyle = '#333';
//         ctx.lineWidth = 1;
//     }

//     const x = e.clientX - canvas.offsetLeft;
//     const y = e.clientY - canvas.offsetTop;

//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(x, y);
// }
function draw(e) {
    if (!isDrawing) return;

    if (isEraser) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 10;
    } else if (isRectangle) {
        drawRectangle(e);
        return;
    } else if (isTriangle) {
        drawTriangle(e);
        return;
    } else {
        ctx.strokeStyle = color.value;
        ctx.lineWidth = stroke_size.value;
    }

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}