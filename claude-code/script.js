// Canvas and UI elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// Game constants
const GRID_SIZE = 20;
const TILE_SIZE = canvas.width / GRID_SIZE;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 0.95; // Speed multiplier when eating food

// Game state
let snake = [];
let food = null;
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = 0;
let speed = INITIAL_SPEED;
let gameLoop = null;
let isPaused = false;
let isGameOver = false;

// Initialize high score from localStorage
function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    highScore = saved ? parseInt(saved) : 0;
    highScoreElement.textContent = highScore;
}

// Save high score to localStorage
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

// Initialize game state
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    speed = INITIAL_SPEED;
    isPaused = false;
    isGameOver = false;
    scoreElement.textContent = score;
    generateFood();
}

// Generate food at random position
function generateFood() {
    let newFood;
    let isOnSnake;

    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);

    food = newFood;
}

// Draw everything on canvas
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00ff88' : '#00cc6a';
        ctx.fillRect(
            segment.x * TILE_SIZE + 1,
            segment.y * TILE_SIZE + 1,
            TILE_SIZE - 2,
            TILE_SIZE - 2
        );

        // Add eyes to head
        if (index === 0) {
            ctx.fillStyle = '#fff';
            const eyeSize = 3;
            const eyeOffset = 6;

            if (direction.x === 1) { // Right
                ctx.fillRect(segment.x * TILE_SIZE + TILE_SIZE - eyeOffset, segment.y * TILE_SIZE + 5, eyeSize, eyeSize);
                ctx.fillRect(segment.x * TILE_SIZE + TILE_SIZE - eyeOffset, segment.y * TILE_SIZE + TILE_SIZE - 8, eyeSize, eyeSize);
            } else if (direction.x === -1) { // Left
                ctx.fillRect(segment.x * TILE_SIZE + eyeOffset - eyeSize, segment.y * TILE_SIZE + 5, eyeSize, eyeSize);
                ctx.fillRect(segment.x * TILE_SIZE + eyeOffset - eyeSize, segment.y * TILE_SIZE + TILE_SIZE - 8, eyeSize, eyeSize);
            } else if (direction.y === -1) { // Up
                ctx.fillRect(segment.x * TILE_SIZE + 5, segment.y * TILE_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
                ctx.fillRect(segment.x * TILE_SIZE + TILE_SIZE - 8, segment.y * TILE_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (direction.y === 1) { // Down
                ctx.fillRect(segment.x * TILE_SIZE + 5, segment.y * TILE_SIZE + TILE_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * TILE_SIZE + TILE_SIZE - 8, segment.y * TILE_SIZE + TILE_SIZE - eyeOffset, eyeSize, eyeSize);
            }
        }
    });

    // Draw food
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.arc(
        food.x * TILE_SIZE + TILE_SIZE / 2,
        food.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Update game state
function update() {
    if (isPaused || isGameOver) return;

    // Update direction
    direction = { ...nextDirection };

    // Calculate new head position
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        speed *= SPEED_INCREASE;
        generateFood();
        saveHighScore();
    } else {
        snake.pop();
    }

    draw();
}

// End game
function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
    saveHighScore();

    // Draw game over message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = false;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
        case ' ':
            if (!isGameOver && gameLoop) {
                togglePause();
            }
            e.preventDefault();
            break;
    }
});

// Button handlers
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', startGame);

function startGame() {
    initGame();
    draw();

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    restartBtn.disabled = false;
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';

    if (!isPaused) {
        draw();
    } else {
        // Show pause message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
}

// Initialize
loadHighScore();
draw();
