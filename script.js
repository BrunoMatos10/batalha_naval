let board = [];
let hits = 0; 
let misses = 0; 
let gameStarted = false;
const boardSize = 5; 
const scoreContainer = document.querySelector('.score');
const hitsDisplay = document.getElementById('hits-score');
const missesDisplay = document.getElementById('misses-score');
const gameBoard = document.getElementById('game-board');

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();

    document.getElementById('easy-btn').addEventListener('click', () => {
        initializeGame(10); 
    });

    document.getElementById('hard-btn').addEventListener('click', () => {
        initializeGame(7); 
    });

    document.getElementById('start-btn').addEventListener('click', restartGame);
});

function initializeGame(numBoats = 3) {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill('agua'));
    hits = 0; 
    misses = 0; 
    scoreContainer.style.display = 'none';
    hitsDisplay.textContent = hits;
    missesDisplay.textContent = misses;
    gameStarted = false;

    createBoard();
    placeBoats(numBoats);
}

function createBoard() {
    gameBoard.innerHTML = ''; 
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

function placeBoats(numBoats) {
    let placedBoats = 0;
    while (placedBoats < numBoats) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (board[row][col] === 'agua') {
            board[row][col] = 'barco'; 
            placedBoats++;
        }
    }
}

function handleCellClick(row, col) {
    if (!gameStarted) {
        gameStarted = true;
        scoreContainer.style.display = 'block';
    }
    
    const cell = gameBoard.children[row * boardSize + col];
    
    
    if (board[row][col] === 'agua') {
        board[row][col] = 'tiro'; 
        cell.innerHTML = '<img src="errou.jfif" alt="Água">';
        misses++; 
    } else if (board[row][col] === 'barco') {
        board[row][col] = 'tiro'; 
        cell.innerHTML = '<img src="fogo.jfif" alt="Barco">'; 
        hits++; 
    }

    
    hitsDisplay.textContent = hits;
    missesDisplay.textContent = misses;
}

function restartGame() {
    initializeGame();
}