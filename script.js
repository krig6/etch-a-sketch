const canvas = document.querySelector('.canvas');
const eraserButton = document.querySelector('.eraser');
const randomButton = document.querySelector('.random');

function createGrid(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let amount = size * size;

    for (let i = 1; i <= amount; i++) {
        let squares = document.createElement('div');
        squares.style.backgroundColor = "white";
        squares.style.border = '1px solid black';
        canvas.insertAdjacentElement('beforeend', squares);
    }
}

// Initial grid: 12x12
createGrid(12);

isPenActive = false;
const drawButton = document.querySelector('.draw');

drawButton.addEventListener('click', () => {
    if (isEraserActive) stopErase();
    stopRandom();
});

eraserButton.addEventListener('click', () => {
    startErase();
});
randomButton.addEventListener('click', () => {
    if (isEraserActive) stopErase();
    startPen();
});

function startPen() {
    isPenActive = !isPenActive;
    if (!isPenActive) {
        canvas.removeEventListener('mouseover', colorGrid);
        return;
    }
    canvas.addEventListener('click', colorGrid);
}

function stopPen() {
    canvas.removeEventListener('click', startPen);

    if (isPenActive) isPenActive = false;
    if (isRandomActive) isRandomActive = false;

    canvas.addEventListener('click', startRandom);
}

function stopErase() {
    isEraserActive = false;
    canvas.removeEventListener('click', startErase);
}

function stopRandom() {
    canvas.removeEventListener('click', startRandom);

    if (isPenActive) isPenActive = false;
    if (isRandomActive) isRandomActive = false;
    canvas.addEventListener('click', startPen);
}

function colorGrid(e) {
    e.target.style.backgroundColor = 'black';
}

isEraserActive = false;





function startErase() {
    isEraserActive = !isEraserActive;
    if (!isEraserActive) {
        canvas.removeEventListener('mouseover', eraseColor);
    }
    canvas.addEventListener('click', eraseColor);
}

function eraseColor(e) {
    e.target.style.backgroundColor = 'white';
}

isRandomActive = false;





function startRandom() {
    isRandomActive = !isRandomActive;
    if (!isRandomActive) {
        canvas.removeEventListener('mouseover', randomColor);
    }
    canvas.addEventListener('click', randomColor);
}

function randomColor(e) {
    e.target.style.backgroundColor = 'red';
}