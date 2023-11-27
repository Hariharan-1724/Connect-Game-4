const boardContainer = document.querySelector('.board-container');
const resetButton = document.querySelector('button');

const numRows = 6;
const numCols = 7;
const playerColors = ['#ffff00', '#000000'];

let currentPlayer = 0; // 0 for yellow, 1 for black
let board = createEmptyBoard();

function createEmptyBoard() {
    return Array.from({ length: numRows }, () => Array(numCols).fill(null));
}

function createBoardUI() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.dataset.row = row;
            slot.dataset.col = col;
            slot.addEventListener('click', handleSlotClick);
            boardContainer.appendChild(slot);
        }
    }
}

function handleSlotClick(event) {
    const clickedSlot = event.target;
    const row = parseInt(clickedSlot.dataset.row);
    const col = parseInt(clickedSlot.dataset.col);

    if (board[row][col] === null) {
        board[row][col] = currentPlayer;
        updateBoardUI();
        checkForWinner(row, col);
        switchPlayer();
    }
}

function updateBoardUI() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, index) => {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        const playerColor = board[row][col] !== null ? playerColors[board[row][col]] : '#ffffff';
        slot.style.backgroundColor = playerColor;
    });
}

function checkForWinner(row, col) {
    if (checkDirection(row, col, 1, 0) ||  // Check horizontally
        checkDirection(row, col, 0, 1) ||  // Check vertically
        checkDirection(row, col, 1, 1) ||  // Check diagonally \
        checkDirection(row, col, 1, -1)) { // Check diagonally /
        declareWinner();
    }
}

function checkDirection(row, col, rowIncrement, colIncrement) {
    const currentPlayerColor = playerColors[currentPlayer];
    let count = 1; // Count the current move

    // Check in one direction
    for (let i = 1; i <= 3; i++) {
        const newRow = row + i * rowIncrement;
        const newCol = col + i * colIncrement;

        if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
            break; // Out of bounds
        }

        if (board[newRow][newCol] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    // Check in the opposite direction
    for (let i = 1; i <= 3; i++) {
        const newRow = row - i * rowIncrement;
        const newCol = col - i * colIncrement;

        if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
            break; // Out of bounds
        }

        if (board[newRow][newCol] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

function declareWinner() {
    const winner = currentPlayer === 0 ? 'Yellow' : 'Black';
    alert(`${winner} player wins!`);
}

function switchPlayer() {
    currentPlayer = 1 - currentPlayer;
}

function resetGame() {
    board = createEmptyBoard();
    updateBoardUI();
}

createBoardUI();



  