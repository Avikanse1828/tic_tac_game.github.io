const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle player clicks on each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Array.from(cells).indexOf(cell);
        if (gameState[index] || !gameActive) return;
        cell.textContent = currentPlayer;
        gameState[index] = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} Wins!`);
            gameActive = false;
        } else if (!gameState.includes(null)) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}
