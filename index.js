const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

let score = 0;
let isJumping = false;
let gameRunning = true;

document.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && !isJumping && gameRunning) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 150;
    let upTime = 0;
    let downTime = 0;
    const jumpInterval = setInterval(() => {
        upTime += 20;
        let position = parseInt(window.getComputedStyle(character).bottom);
        if (upTime <= 300) {
            character.style.bottom = (position + 10) + 'px';
        } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                downTime += 20;
                let pos = parseInt(window.getComputedStyle(character).bottom);
                if (pos > 10) {
                    character.style.bottom = (pos - 10) + 'px';
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top
    ) {
        gameRunning = false;
        gameOver();
    }
}

function updateScore() {
    if (gameRunning) {
        score++;
        scoreDisplay.textContent = score;
    }
}

function gameOver() {
    clearInterval(scoreInterval);
    clearInterval(collisionInterval);
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
    obstacle.style.animationPlayState = 'paused';
}

function restartGame() {
    window.location.reload();
}

const scoreInterval = setInterval(updateScore, 500);
const collisionInterval = setInterval(checkCollision, 10);
