const mainContainer = document.querySelector('#main_container');
const colorModeSelector = document.querySelector('#colorMode');

function createGrid(size) {
    mainContainer.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${400 / size}px`;
        cell.style.height = `${400 / size}px`;
        cell.style.border = '0.5px solid black';
        cell.style.boxSizing = 'border-box';

        const paint = document.createElement('div');
        paint.classList.add('paint');
        paint.style.width = '100%';
        paint.style.height = '100%';
        paint.style.opacity = 0;
        paint.style.pointerEvents = 'none'; 

        cell.appendChild(paint);
        mainContainer.appendChild(cell);
    }
}

function clearCell(cell) {
    const paint = cell.firstElementChild;
    paint.style.backgroundColor = '';
    paint.style.opacity = 0;
}

mainContainer.addEventListener('mouseover', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const paint = cell.firstElementChild;
    const colorMode = colorModeSelector.value;

    if (colorMode === 'eraser') {
        clearCell(cell);
        return;
    }

    let opacity = Number(paint.style.opacity);

    if (opacity === 0) {
        paint.style.backgroundColor = colorMode === 'random' ? getRandomColor() : 'black';
    }

    opacity = Math.min(Math.round((opacity + 0.1) * 10) / 10, 1);
    paint.style.opacity = opacity;
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(clearCell);
});

const setGridSizeButton = document.querySelector('#setGridSize');
setGridSizeButton.addEventListener('click', () => {
    const gridSizeInput = document.querySelector('#gridSize');
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 1 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a number between 1 and 100.');
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

createGrid(16);