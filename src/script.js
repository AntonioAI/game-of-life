/*
 * Game of Life Simulator - Main Script
 * Implementation of Step 3.1 - Set Up the Canvas Element
 * Implementation of Step 3.2 - Implement Cell Toggling Functionality
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

// Grid boundary type (toroidal or finite)
let boundaryType = 'toroidal'; // default is toroidal (edges connect)

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

// Toggle the state of a cell
function toggleCell(x, y) {
    // Ensure coordinates are within grid bounds
    if (x >= 0 && x < gridSettings.cols && y >= 0 && y < gridSettings.rows) {
        // Toggle the cell state (0 to 1 or 1 to 0)
        grid[y][x] = grid[y][x] === 0 ? 1 : 0;
        // Redraw the grid to show the updated state
        drawGrid();
    }
}

// Get grid coordinates from mouse/touch position
function getCellCoordinates(event) {
    // Get canvas position relative to viewport
    const rect = canvas.getBoundingClientRect();
    
    // Calculate position within canvas
    let clientX, clientY;
    
    // Handle both mouse and touch events
    if (event.type.includes('touch')) {
        // For touch events, use the first touch point
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        // For mouse events
        clientX = event.clientX;
        clientY = event.clientY;
    }
    
    // Calculate the scale ratio between the canvas's displayed size and its actual size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get the position within the canvas, accounting for scaling
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;
    
    // Convert to grid coordinates
    const gridX = Math.floor(canvasX / gridSettings.cellSize);
    const gridY = Math.floor(canvasY / gridSettings.cellSize);
    
    return { x: gridX, y: gridY };
}

// Handle canvas click/touch events
function handleCanvasInteraction(event) {
    // Prevent default behavior (like scrolling on mobile)
    event.preventDefault();
    
    const coords = getCellCoordinates(event);
    toggleCell(coords.x, coords.y);
}

// Setup event listeners for canvas interactions
function setupCanvasInteractions() {
    // Mouse events
    canvas.addEventListener('mousedown', handleCanvasInteraction);
    
    // Touch events for mobile devices
    canvas.addEventListener('touchstart', handleCanvasInteraction, { passive: false });
    
    // Prevent context menu on right-click
    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
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

// Count the number of alive neighbors for a given cell
function countAliveNeighbors(x, y) {
    let count = 0;
    
    // Check all 8 neighboring cells (horizontal, vertical, diagonal)
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            // Skip the cell itself
            if (dx === 0 && dy === 0) continue;
            
            let nx, ny;
            
            if (boundaryType === 'toroidal') {
                // Toroidal wrapping (edges connect)
                nx = (x + dx + gridSettings.cols) % gridSettings.cols;
                ny = (y + dy + gridSettings.rows) % gridSettings.rows;
            } else {
                // Finite grid (edges don't connect)
                nx = x + dx;
                ny = y + dy;
                
                // Skip if neighbor is outside grid boundaries
                if (nx < 0 || nx >= gridSettings.cols || ny < 0 || ny >= gridSettings.rows) {
                    continue;
                }
            }
            
            // Increment count if neighbor is alive
            if (grid[ny][nx] === 1) {
                count++;
            }
        }
    }
    
    return count;
}

// Compute the next generation based on Game of Life rules
function computeNextGeneration() {
    // Create a new grid for the next generation
    const nextGrid = [];
    for (let y = 0; y < gridSettings.rows; y++) {
        const row = [];
        for (let x = 0; x < gridSettings.cols; x++) {
            const aliveNeighbors = countAliveNeighbors(x, y);
            const isAlive = grid[y][x] === 1;
            
            // Apply Conway's Game of Life rules:
            // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
            // 2. Any live cell with two or three live neighbors lives on (survival)
            // 3. Any live cell with more than three live neighbors dies (overcrowding)
            // 4. Any dead cell with exactly three live neighbors becomes alive (reproduction)
            
            if (isAlive) {
                // Cell is currently alive
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    // Rule 1 or 3: Die due to underpopulation or overcrowding
                    row.push(0);
                } else {
                    // Rule 2: Stay alive
                    row.push(1);
                }
            } else {
                // Cell is currently dead
                if (aliveNeighbors === 3) {
                    // Rule 4: Become alive due to reproduction
                    row.push(1);
                } else {
                    // Stay dead
                    row.push(0);
                }
            }
        }
        nextGrid.push(row);
    }
    
    // Update the current grid with the new generation
    grid = nextGrid;
}

// Advance the simulation by one generation
function stepSimulation() {
    computeNextGeneration();
    drawGrid();
}

// Function to toggle between toroidal and finite grid
function toggleBoundaryType() {
    boundaryType = boundaryType === 'toroidal' ? 'finite' : 'toroidal';
    return boundaryType;
}

// Add boundary type toggle to settings panel
function addBoundaryToggle() {
    const settingsDiv = document.querySelector('.grid-settings');
    
    const boundaryDiv = document.createElement('div');
    boundaryDiv.className = 'boundary-setting';
    boundaryDiv.innerHTML = `
        <label for="boundary-toggle">Grid Boundary:</label>
        <select id="boundary-toggle">
            <option value="toroidal" selected>Toroidal (Edges Connect)</option>
            <option value="finite">Finite (Fixed Edges)</option>
        </select>
    `;
    
    settingsDiv.appendChild(boundaryDiv);
    
    // Add event listener to the boundary toggle
    const boundaryToggle = document.getElementById('boundary-toggle');
    boundaryToggle.addEventListener('change', () => {
        boundaryType = boundaryToggle.value;
    });
}

// Add a test pattern (glider) for verifying rules
function createTestPattern() {
    // Clear the grid first
    initializeGrid();
    
    // Create a glider pattern:
    //   O
    //    O
    //  OOO
    
    // Using coordinates relative to the center of the grid
    const centerX = Math.floor(gridSettings.cols / 2);
    const centerY = Math.floor(gridSettings.rows / 2);
    
    // Set the glider cells to alive
    grid[centerY-1][centerX] = 1;     // Top middle
    grid[centerY][centerX+1] = 1;     // Middle right
    grid[centerY+1][centerX-1] = 1;   // Bottom left
    grid[centerY+1][centerX] = 1;     // Bottom middle
    grid[centerY+1][centerX+1] = 1;   // Bottom right
    
    // Redraw the grid
    drawGrid();
}

// Add a test pattern button to the simulation controls
function createSimulationControls() {
    const controlsDiv = document.querySelector('.controls');
    
    // Create the controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'simulation-controls';
    controlsContainer.innerHTML = `
        <h3>Simulation Controls</h3>
        <div class="control-buttons">
            <button id="step-button">Step</button>
            <button id="test-pattern-button">Create Glider</button>
        </div>
    `;
    
    controlsDiv.appendChild(controlsContainer);
    
    // Add event listener to step button
    const stepButton = document.getElementById('step-button');
    stepButton.addEventListener('click', stepSimulation);
    
    // Add event listener to test pattern button
    const testPatternButton = document.getElementById('test-pattern-button');
    testPatternButton.addEventListener('click', createTestPattern);
}

// Update the init function to include the simulation controls
function init() {
    calculateCanvasDimensions();
    initializeGrid();
    drawGrid();
    createSettingsPanel();
    addBoundaryToggle();
    createSimulationControls();
    setupCanvasInteractions();
}

// Removing the existing init function call to avoid duplication
window.removeEventListener('load', init);

// Call init when the page is loaded
window.addEventListener('load', init); 