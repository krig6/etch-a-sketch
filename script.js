const canvas = document.querySelector('.canvas');

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

function colorGrid(e) {
    e.target.style.backgroundColor = 'black';
}