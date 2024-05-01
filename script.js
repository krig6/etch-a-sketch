const canvas = document.querySelector('.canvas');
const drawButton = document.querySelector('.draw');
const randomButton = document.querySelector('.random');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
const getPenColor = document.querySelector('#pen-color');
const getCanvasColor = document.querySelector('#canvas-color');
const gridButton = document.querySelector('.grid-lines')

isPenActive = false;
isEraserActive = false;
isRandomActive = false;

getCanvasColor.addEventListener('change', () => {
    createGrid(12);
})
function createGrid(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    canvas.innerHTML = "";
    let amount = size * size;

    for (let i = 1; i <= amount; i++) {
        let squares = document.createElement('div');
        squares.style.backgroundColor = getCanvasColor.value;
        squares.className = 'box'
        canvas.insertAdjacentElement('beforeend', squares);
    }
}
// Initial grid: 12x12
createGrid(12);

gridButton.addEventListener('click', () => {
    canvas.classList.toggle("gridlines");
});

drawButton.addEventListener('click', () => {
    if (isEraserActive) stopErase();
    stopRandom();
    drawButton.disabled = true;
    randomButton.disabled = false;
    eraserButton.disabled = false;
});

randomButton.addEventListener('click', () => {
    if (isEraserActive) stopErase();
    stopPen();
    randomButton.disabled = true;
    drawButton.disabled = false;
    eraserButton.disabled = false;
});

eraserButton.addEventListener('click', () => {
    startErase();
    randomButton.disabled = false;
    drawButton.disabled = false;
    eraserButton.disabled = true;
});

clearButton.addEventListener('click', () => {
    canvas.removeEventListener('mouseover', colorGrid);
    canvas.removeEventListener('mouseover', randomColor);
    let selectAllBox = document.querySelectorAll('.box');
    for (let box of selectAllBox) {
        box.style.backgroundColor = getCanvasColor.value;
    }
    isRandomActive = false;
    isPenActive = false;
});


function colorGrid(e) {
    e.target.style.backgroundColor = getPenColor.value;
}

function startPen(e) {
    isPenActive = !isPenActive;
    if (!isPenActive) {
        canvas.removeEventListener('mouseover', colorGrid);
        return;
    }
    e.target.style.backgroundColor = getPenColor.value;
    canvas.addEventListener('mouseover', colorGrid);
}

function stopPen() {
    canvas.removeEventListener('click', startPen);
    canvas.removeEventListener('mouseover', colorGrid);

    if (isPenActive) isPenActive = false;
    if (isRandomActive) isRandomActive = false;

    canvas.addEventListener('click', startRandom);
}

function randomColor(e) {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function startRandom(e) {
    isRandomActive = !isRandomActive;
    if (!isRandomActive) {
        canvas.removeEventListener('mouseover', randomColor);
        return;
    }
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    canvas.addEventListener('mouseover', randomColor);
}

function stopRandom() {
    canvas.removeEventListener('click', startRandom);
    canvas.removeEventListener('mouseover', randomColor);

    if (isPenActive) isPenActive = false;
    if (isRandomActive) isRandomActive = false;

    canvas.addEventListener('click', startPen);
}

function eraseColor(e) {
    e.target.style.backgroundColor = getCanvasColor.value;
}

function startErase() {
    canvas.removeEventListener('mouseover', colorGrid);
    canvas.removeEventListener('click', startPen);
    canvas.removeEventListener('mouseover', randomColor);
    canvas.removeEventListener('click', startRandom);
    canvas.addEventListener('click', eraseGrid)
}

function eraseGrid(e) {
    isEraserActive = !isEraserActive;
    if (!isEraserActive) {
        canvas.removeEventListener('mouseover', eraseColor);
        return;
    }
    e.target.style.backgroundColor = getCanvasColor.value
    canvas.addEventListener('mouseover', eraseColor);
}

function stopErase() {
    isEraserActive = false;
    canvas.removeEventListener('click', eraseGrid);
    canvas.removeEventListener('mouseover', eraseColor);
}



