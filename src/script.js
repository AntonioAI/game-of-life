/*
 * Game of Life Simulator - Main Script
 * Implementation of Step 3.1 - Set Up the Canvas Element
 */

// Canvas and context references
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Default grid settings
let gridSettings = {
    cellSize: 10,
    rows: 50,
    cols: 50,
    gridColor: '#dddddd',
    cellColor: '#000000',
    backgroundColor: '#ffffff'
};

// Grid state (2D array to store alive/dead states)
let grid = [];

// Initialize the grid with all cells dead (0)
function initializeGrid() {
    grid = [];
    for (let y = 0; y < gridSettings.rows; y++) {
        const row = [];
        for (let x = 0; x < gridSettings.cols; x++) {
            row.push(0); // 0 = dead, 1 = alive
        }
        grid.push(row);
    }
}

// Calculate canvas dimensions based on grid size
function calculateCanvasDimensions() {
    canvas.width = gridSettings.cols * gridSettings.cellSize;
    canvas.height = gridSettings.rows * gridSettings.cellSize;
}

// Draw the grid on the canvas
function drawGrid() {
    // Clear the canvas
    ctx.fillStyle = gridSettings.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the cells
    for (let y = 0; y < gridSettings.rows; y++) {
        for (let x = 0; x < gridSettings.cols; x++) {
            // If cell is alive, fill it with cell color
            if (grid[y][x] === 1) {
                ctx.fillStyle = gridSettings.cellColor;
                ctx.fillRect(
                    x * gridSettings.cellSize, 
                    y * gridSettings.cellSize, 
                    gridSettings.cellSize, 
                    gridSettings.cellSize
                );
            }
            
            // Draw grid lines
            ctx.strokeStyle = gridSettings.gridColor;
            ctx.strokeRect(
                x * gridSettings.cellSize, 
                y * gridSettings.cellSize, 
                gridSettings.cellSize, 
                gridSettings.cellSize
            );
        }
    }
}

// Create grid size settings panel
function createSettingsPanel() {
    const controlsDiv = document.querySelector('.controls');
    
    // Create the settings container
    const settingsDiv = document.createElement('div');
    settingsDiv.className = 'grid-settings';
    settingsDiv.innerHTML = `
        <h3>Grid Settings</h3>
        <div class="preset-buttons">
            <button data-size="50">50×50</button>
            <button data-size="75">75×75</button>
            <button data-size="100">100×100</button>
        </div>
        <div class="custom-size">
            <label for="custom-rows">Rows:</label>
            <input type="number" id="custom-rows" min="10" max="200" value="${gridSettings.rows}">
            <label for="custom-cols">Columns:</label>
            <input type="number" id="custom-cols" min="10" max="200" value="${gridSettings.cols}">
            <button id="apply-size">Apply</button>
        </div>
    `;
    
    controlsDiv.appendChild(settingsDiv);
    
    // Add event listeners to preset buttons
    const presetButtons = settingsDiv.querySelectorAll('.preset-buttons button');
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const size = parseInt(button.getAttribute('data-size'), 10);
            resizeGrid(size, size);
        });
    });
    
    // Add event listener to custom size apply button
    const applyButton = document.getElementById('apply-size');
    applyButton.addEventListener('click', () => {
        const rows = parseInt(document.getElementById('custom-rows').value, 10);
        const cols = parseInt(document.getElementById('custom-cols').value, 10);
        
        // Validate input
        if (isNaN(rows) || isNaN(cols) || rows < 10 || cols < 10 || rows > 200 || cols > 200) {
            alert('Please enter valid dimensions (10-200)');
            return;
        }
        
        resizeGrid(rows, cols);
    });
}

// Resize the grid with new dimensions
function resizeGrid(rows, cols) {
    gridSettings.rows = rows;
    gridSettings.cols = cols;
    calculateCanvasDimensions();
    initializeGrid();
    drawGrid();
}

// Initialize the application
function init() {
    calculateCanvasDimensions();
    initializeGrid();
    drawGrid();
    createSettingsPanel();
}

// Call init when the page is loaded
window.addEventListener('load', init); 