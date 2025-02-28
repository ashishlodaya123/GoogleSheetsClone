document.addEventListener('DOMContentLoaded', () => {
    initializeSpreadsheet();
    loadSpreadsheet();
});

let selectedCells = []; // Track multiple selected cells
let history = [];
let historyIndex = -1;

function initializeSpreadsheet() {
    const table = document.getElementById('spreadsheet');
    for (let i = 0; i < 20; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 20; j++) {
            const cell = document.createElement(i === 0 || j === 0 ? 'th' : 'td');
            cell.id = `cell-${i}-${j}`;

            if (i === 0 && j !== 0) {
                cell.innerText = j;
            } else if (j === 0 && i !== 0) {
                cell.innerText = i;
            } else if (i !== 0 && j !== 0) {
                cell.contentEditable = true;
                cell.addEventListener('click', (e) => {
                    if (e.shiftKey) {
                        selectMultipleCells(cell);
                    } else {
                        selectCell(cell);
                    }
                });
                cell.addEventListener('input', () => updateFormulaBar(cell));
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function selectCell(cell) {
    selectedCells.forEach(c => c.classList.remove('selected'));
    selectedCells = [cell];
    cell.classList.add('selected');
    document.getElementById('formulaBar').value = cell.innerText;
    cell.focus();
}

function selectMultipleCells(cell) {
    if (!selectedCells.includes(cell)) {
        cell.classList.add('selected');
        selectedCells.push(cell);
    }
}

function updateFormulaBar(cell) {
    document.getElementById('formulaBar').value = cell.innerText;
    saveState();
}

// Apply Formula to Selected Cells
function applyFormula() {
    const formula = prompt("Enter formula (SUM, AVERAGE, MIN, MAX):");
    if (!formula || !selectedCells.length) return;

    const values = selectedCells.map(cell => parseFloat(cell.innerText)).filter(v => !isNaN(v));

    let result;
    switch (formula.toUpperCase()) {
        case 'SUM':
            result = values.reduce((a, b) => a + b, 0);
            break;
        case 'AVERAGE':
            result = values.reduce((a, b) => a + b, 0) / values.length;
            break;
        case 'MIN':
            result = Math.min(...values);
            break;
        case 'MAX':
            result = Math.max(...values);
            break;
        default:
            alert("Invalid formula!");
            return;
    }

    selectedCells[0].innerText = result;
    saveState();
}

// Unique Functionalities

function predictTrend() {
    const values = selectedCells.map(cell => parseFloat(cell.innerText)).filter(v => !isNaN(v));
    if (values.length < 2) {
        alert("Need at least 2 numeric values to predict trend.");
        return;
    }
    const nextValue = predictNextValue(values);
    alert(`Predicted next value: ${nextValue}`);
}

function analyzeText() {
    const text = selectedCells[0].innerText;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = text.length;
    alert(`Words: ${wordCount}, Characters: ${charCount}`);
}

function generateRandomNumbers() {
    const min = parseFloat(prompt("Enter minimum value:"));
    const max = parseFloat(prompt("Enter maximum value:"));
    if (isNaN(min) || isNaN(max)) {
        alert("Invalid input!");
        return;
    }
    selectedCells.forEach(cell => {
        cell.innerText = (Math.random() * (max - min) + min).toFixed(2);
    });
    saveState();
}

function insertEmoji() {
    const emoji = prompt("Enter an emoji:");
    if (emoji) {
        selectedCells[0].innerText += emoji;
        saveState();
    }
}

function addComment() {
    const comment = prompt("Enter your comment:");
    if (comment) {
        selectedCells[0].setAttribute('title', comment);
    }
}

function lockCells() {
    selectedCells.forEach(cell => {
        cell.contentEditable = !cell.isContentEditable;
        cell.style.backgroundColor = cell.isContentEditable ? '' : '#ffcccc';
    });
    saveState();
}

// Helper Functions
function predictNextValue(data) {
    const x = data.map((_, i) => i);
    const y = data;
    const slope = (y[y.length - 1] - y[0]) / (x[x.length - 1] - x[0]);
    return y[y.length - 1] + slope;
}

// Save/Load, Undo/Redo, and other existing functions remain the same...

// Formatting Functions
function formatBold() {
    if (selectedCell) {
        selectedCell.style.fontWeight = selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
        saveState();
    }
}

function formatItalic() {
    if (selectedCell) {
        selectedCell.style.fontStyle = selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
        saveState();
    }
}

function formatUnderline() {
    if (selectedCell) {
        selectedCell.style.textDecoration = selectedCell.style.textDecoration === 'underline' ? 'none' : 'underline';
        saveState();
    }
}

function formatStrikethrough() {
    if (selectedCell) {
        selectedCell.style.textDecoration = selectedCell.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        saveState();
    }
}

function changeFontFamily() {
    if (selectedCell) {
        selectedCell.style.fontFamily = document.getElementById('fontFamily').value;
        saveState();
    }
}

function changeFontSize() {
    if (selectedCell) {
        selectedCell.style.fontSize = document.getElementById('fontSize').value + 'px';
        saveState();
    }
}

function changeFontColor() {
    if (selectedCell) {
        selectedCell.style.color = document.getElementById('fontColor').value;
        saveState();
    }
}

function changeCellColor() {
    if (selectedCell) {
        selectedCell.style.backgroundColor = document.getElementById('cellColor').value;
        saveState();
    }
}

// Merge and Unmerge Cells
function mergeCells() {
    if (selectedCell) {
        selectedCell.colSpan = 2;
        saveState();
    }
}

function unmergeCells() {
    if (selectedCell) {
        selectedCell.colSpan = 1;
        saveState();
    }
}

// Undo/Redo Functionality
function saveState() {
    const cells = document.querySelectorAll('td, th');
    const state = Array.from(cells).map(cell => ({
        id: cell.id,
        innerText: cell.innerText,
        style: cell.style.cssText
    }));
    history = history.slice(0, historyIndex + 1);
    history.push(state);
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        applyState(history[historyIndex]);
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        applyState(history[historyIndex]);
    }
}

function applyState(state) {
    state.forEach(cellState => {
        const cell = document.getElementById(cellState.id);
        if (cell) {
            cell.innerText = cellState.innerText;
            cell.style.cssText = cellState.style;
        }
    });
}

// Export/Import Functionality
function exportCSV() {
    const rows = document.querySelectorAll('#spreadsheet tr');
    let csvContent = "";

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td, th').forEach(cell => {
            rowData.push(cell.innerText);
        });
        csvContent += rowData.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet.csv';
    a.click();
}

function importCSV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n');
            rows.forEach((row, i) => {
                const cells = row.split(',');
                cells.forEach((cell, j) => {
                    const tableCell = document.getElementById(`cell-${i}-${j}`);
                    if (tableCell) tableCell.innerText = cell;
                });
            });
        };
        reader.readAsText(file);
    };
    input.click();
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    saveState();
}

// Save/Load Functionality
async function saveSpreadsheet() {
    showLoadingSpinner();
    const cells = document.querySelectorAll('td');
    let data = {};

    cells.forEach(cell => {
        if (cell.innerText.trim() !== "") {
            data[cell.id] = cell.innerText;
        }
    });

    try {
        await fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spreadsheet_data: data })
        });
        alert("Spreadsheet saved successfully!");
    } catch (error) {
        alert("Error saving data.");
    } finally {
        hideLoadingSpinner();
    }
}

async function loadSpreadsheet() {
    showLoadingSpinner();
    try {
        const response = await fetch('/load');
        const data = await response.json();

        if (data.spreadsheet_data) {
            for (const cellId in data.spreadsheet_data) {
                const cell = document.getElementById(cellId);
                if (cell) cell.innerText = data.spreadsheet_data[cellId];
            }
        }
    } catch (error) {
        alert("Error loading data.");
    } finally {
        hideLoadingSpinner();
    }
}

function clearSpreadsheet() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.innerText = '';
    });
    saveState();
}

// Loading Spinner
function showLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}