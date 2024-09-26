class Grid {
    constructor(containerSelector, rows = 16, cols = 16) {
        this.container = document.querySelector(containerSelector);
        this.rows = rows;
        this.cols = cols;
        this.color = '#0b090a';
        this.isMouseDown = false;
        this.isEraserActive = false;
        this.isRainbowActive = false; 
        this.createGrid(this.rows, this.cols);
        this.addMouseEvents();
    }

    addMouseEvents() {
        this.container.addEventListener('mousedown', () => this.isMouseDown = true);
        this.container.addEventListener('mouseup', () => this.isMouseDown = false);
        this.container.addEventListener('mouseleave', () => this.isMouseDown = false);
        this.container.addEventListener('mouseenter', (event) => {
            if (event.buttons === 1) {
                this.isMouseDown = true;
            }
        });
    }

    createGrid(rows, cols) {
        this.container.innerHTML = '';
        const boxSize = 800 / Math.max(rows, cols);
        const fragment = document.createDocumentFragment();

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.style.width = `${boxSize}px`;
                cell.style.height = `${boxSize}px`;
                cell.style.boxSizing = 'border-box';

                fragment.appendChild(cell);
            }
        }
        this.container.appendChild(fragment);
        this.addCellEventListeners();
    }

    addCellEventListeners() {
        const cells = this.container.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.addEventListener('mousedown', () => this.handleCellInteraction(cell));
            cell.addEventListener('mousemove', () => {
                if (this.isMouseDown) this.handleCellInteraction(cell);
            });
        });
    }

    handleCellInteraction(cell) {
        if (this.isEraserActive) {
            this.eraseColor(cell);
        } else {
            this.changeColor(cell);
        }
    }

    eraseColor(cell) {
        cell.style.background = 'transparent';
    }

    changeColor(cell) {
        if (this.isRainbowActive) {
            cell.style.background = "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
            cell.style.background = this.color;
        }
    }

    resizeGrid(newRows, newCols) {
        this.rows = newRows;
        this.cols = newCols;
        this.createGrid(this.rows, this.cols);
    }

    setColor(color) {
        this.color = color;
    }

    resetGrid() {
        this.isEraserActive = false;
        this.createGrid(this.rows, this.cols);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = new Grid('.grid');

    document.getElementById('rainbow').addEventListener('click', () => {
        grid.isRainbowActive = !grid.isRainbowActive;
    });

    document.getElementById('reset').addEventListener('click', () => {
        grid.resetGrid();
    });

    document.getElementById('eraser').addEventListener('click', () => {
        grid.isEraserActive = !grid.isEraserActive;
    });

    document.getElementById('head').addEventListener('input', (event) => {
        grid.setColor(event.target.value);
    });
});