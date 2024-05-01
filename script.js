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

createGrid(12);