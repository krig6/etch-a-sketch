// DOM element selectors
const canvas = document.querySelector('.canvas');
const buttons = document.querySelector('.drawing-buttons');
const clearButton = document.querySelector('#clear');
const penSwatch = document.querySelector('#pen-swatch');
const canvasSwatch = document.querySelector('#canvas-swatch');
const canvasSizeSlider = document.querySelector('#canvas-size-slider');
const canvasSizeSliderLabel = document.querySelector('#canvas-size-slider-label');
const gridlinesToggle = document.querySelector('#toggle-grid');
const saveButton = document.querySelector('#save');

// Initial grid
createGrid(canvasSizeSlider.value);

// Variables to track tool states
let isPenActive = false;
let isRandomPenActive = false;
let isEraserActive = false;

// Function to create grid based on size input
function createGrid(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    canvas.innerHTML = "";
    let amount = size * size;
    for (let i = 1; i <= amount; i++) {
        let squares = document.createElement('div');
        squares.style.backgroundColor = canvasSwatch.value;
        squares.className = 'box';
        canvas.insertAdjacentElement('beforeend', squares);
    }
}
// Main buttons event delegation
buttons.addEventListener('click', (event) => {
    let target = event.target;
    // Enable all buttons initially
    Array.from(buttons.children).forEach(button => {
        button.disabled = false;
    });
    // Execute actions based on the clicked button
    switch (target.id) {
        case 'pen':
            if (isEraserActive) stopEraser();
            stopRandomPen();
            target.disabled = true;
            break;
        case 'random':
            if (isEraserActive) stopEraser();
            stopPen();
            target.disabled = true;
            break;
        case 'eraser':
            startEraser();
            target.disabled = true;
            break;
    }
});

// Event listeners for other buttons
saveButton.addEventListener('click', saveAsImage);

canvasSwatch.addEventListener('change', () => {
    createGrid(canvasSizeSlider.value);
});

canvasSizeSlider.addEventListener('input', () => {
    canvasSizeSliderLabel.textContent = `${canvasSizeSlider.value} x ${canvasSizeSlider.value}`;
    createGrid(canvasSizeSlider.value);
});

gridlinesToggle.addEventListener('click', () => {
    canvas.classList.toggle("gridlines");
});

clearButton.addEventListener('click', () => {
    canvas.removeEventListener('mouseover', colorGridWithPen);
    canvas.removeEventListener('mouseover', colorGridWithRandom);
    let selectAllBox = document.querySelectorAll('.box');
    for (let box of selectAllBox) {
        box.style.backgroundColor = canvasSwatch.value;
    }
    isPenActive = false;
    isRandomPenActive = false;
});

// Functions for drawing with pen button
function startPen(e) {
    isPenActive = !isPenActive;
    if (!isPenActive) {
        canvas.removeEventListener('mouseover', colorGridWithPen);
        return;
    }
    e.target.style.backgroundColor = penSwatch.value;
    canvas.addEventListener('mouseover', colorGridWithPen);
}

function stopPen() {
    canvas.removeEventListener('click', startPen);
    canvas.removeEventListener('mouseover', colorGridWithPen);
    if (isPenActive) isPenActive = false;
    if (isRandomPenActive) isRandomPenActive = false;
    canvas.addEventListener('click', startRandomPen);
}

function colorGridWithPen(e) {
    e.target.style.backgroundColor = penSwatch.value;
}

// Functions for drawing with random button
function startRandomPen(e) {
    isRandomPenActive = !isRandomPenActive;
    if (!isRandomPenActive) {
        canvas.removeEventListener('mouseover', colorGridWithRandom);
        return;
    }
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    canvas.addEventListener('mouseover', colorGridWithRandom);
}

function stopRandomPen() {
    canvas.removeEventListener('click', startRandomPen);
    canvas.removeEventListener('mouseover', colorGridWithRandom);
    if (isPenActive) isPenActive = false;
    if (isRandomPenActive) isRandomPenActive = false;
    canvas.addEventListener('click', startPen);
}

function colorGridWithRandom(e) {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Functions for erase button
function startEraser() {
    canvas.removeEventListener('mouseover', colorGridWithPen);
    canvas.removeEventListener('click', startPen);
    canvas.removeEventListener('mouseover', colorGridWithRandom);
    canvas.removeEventListener('click', startRandomPen);
    canvas.addEventListener('click', eraseGrid);
}

function stopEraser() {
    isEraserActive = false;
    canvas.removeEventListener('click', eraseGrid);
    canvas.removeEventListener('mouseover', eraseColor);
}

function eraseGrid(e) {
    isEraserActive = !isEraserActive;
    if (!isEraserActive) {
        canvas.removeEventListener('mouseover', eraseColor);
        return;
    }
    e.target.style.backgroundColor = canvasSwatch.value;
    canvas.addEventListener('mouseover', eraseColor);
}

function eraseColor(e) {
    e.target.style.backgroundColor = canvasSwatch.value;
}

function saveAsImage() {

    // Create a temporary canvas element
    const tempCanvas = document.createElement('canvas');

    // Get the 2D rendering context of the temporary canvas
    const tempCtx = tempCanvas.getContext('2d');

    // Get the dimensions of the canvas
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Set the dimensions of the temporary canvas
    tempCanvas.width = width;
    tempCanvas.height = height;

    // Clear the temporary canvas
    tempCtx.clearRect(0, 0, width, height);

    // Get the position of the canvas relative to the document
    const canvasRect = canvas.getBoundingClientRect();
    const canvasLeft = canvasRect.left;
    const canvasTop = canvasRect.top;

    // Draw the grid content onto the temporary canvas
    const gridItems = document.querySelectorAll('.box');
    gridItems.forEach((item) => {

        // Get the computed style of the grid item
        const style = window.getComputedStyle(item);

        // Get the background color of the grid item
        const bgColor = style.getPropertyValue('background-color');

        // Ensure background color is fully opaque
        tempCtx.fillStyle = bgColor.includes('rgba') ? '#ffffff' : bgColor;

        // Calculate the position and size of the box relative to the canvas
        const boxLeft = Math.round(item.offsetLeft - canvasLeft);
        const boxTop = Math.round(item.offsetTop - canvasTop);
        const boxWidth = Math.round(item.offsetWidth);
        const boxHeight = Math.round(item.offsetHeight);
        tempCtx.fillRect(boxLeft, boxTop, boxWidth, boxHeight);
    });

    // Convert canvas content into an image
    const image = tempCanvas.toDataURL('image/png');

    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'amazing_art.png';
    link.click();
}

