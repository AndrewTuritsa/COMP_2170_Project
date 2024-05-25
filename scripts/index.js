import Score from './score.js';

let board;
let boardWidth = 1000;
let boardHeight = 600;
let context;

let crabWidth = 140;
let crabHeight = 120;
let crabX = 50;
let crabY = boardHeight / 2 - crabHeight / 2;

let crabImg = new Image();
crabImg.src = "images/theRunningCrab.svg";

let obstacle1Img = new Image();
obstacle1Img.src = "images/brokenBottle.svg";

let obstacle2Img = new Image();
obstacle2Img.src = "images/fishingHook.svg";

let obstacle3Img = new Image();
obstacle3Img.src = "images/rockObstacle.svg";

let crab = {
    x: crabX,
    y: crabY,
    width: crabWidth,
    height: crabHeight,
};

// Obstacles are broken bottle, fishing hook, and rocks
let obstacleArray = [];
let obstacleTypes = [
    { img: obstacle1Img, width: 90 },
    { img: obstacle2Img, width: 100 },
    { img: obstacle3Img, width: 100 }
];
let obstacleHeight = 90;
let laneHeights = [boardHeight / 6, boardHeight / 2, 5 * boardHeight / 6];

// Physics/speed
let velocityX = -7;
let gameOver = false;

let score;
const currentPage = window.location.pathname.split("/").pop();

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext('2d');
    score = new Score(context, 1);

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
    document.addEventListener("keydown", function (event) {
        if (!gameOver) {
            if (event.key === "z") {
                moveToBottom();
            }
            if (event.key === "x") {
                moveToMiddle();
            }
            if (event.key === "c") {
                moveToTop();
            }
        }
    });
    document.getElementById('button').addEventListener('click', startGame);
};

function update() {
    if (gameOver) {
        score.setHighScore();
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    score.update(1);
    score.draw();

    // Crabbox
    context.fillStyle = 'red';
    context.drawImage(crabImg, crab.x, crab.y, crab.width, crab.height);
    context.font = "50px serif";
    context.fillText("Z", crabX, laneHeights[0]);
    context.fillText("X", crabX, laneHeights[1]);
    context.fillText("C", crabX, laneHeights[2]);

    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;

        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (handleCollision(crab, obstacle)) {
            gameOver = true;
            score.setHighScore();
            showGameOverScreen();
            return;
        }
    }
    requestAnimationFrame(update);
}

function placeObstacle() {
    let laneIndex = Math.floor(Math.random() * 3);
    let obstacleTypeIndex = Math.floor(Math.random() * obstacleTypes.length);
    let obstacleType = obstacleTypes[obstacleTypeIndex];

    // Change velocity 
    if (velocityX >= -20) {
        if (currentPage === "level01.html") {
            velocityX = -7;
        } else if (currentPage === "level02.html") {
            velocityX = -10;
        } else if (currentPage === "level03.html") {
            velocityX = -15;
        }
    }

    // Place obstacle
    let obstacle = {
        x: boardWidth,
        y: laneHeights[laneIndex] - obstacleHeight / 2,
        width: obstacleType.width,
        height: obstacleHeight,
        img: obstacleType.img
    };

    obstacleArray.push(obstacle);
}

function handleCollision(crab, obstacle) {
    return (
        crab.x < obstacle.x + obstacle.width &&
        crab.x + crab.width > obstacle.x &&
        crab.y < obstacle.y + obstacle.height &&
        crab.y + crab.height > obstacle.y
    );
}

function showGameOverScreen() {
    document.getElementById('gameOverScreen').style.display = 'block';
}

function startGame() {
    crab.y = crabY;
    obstacleArray = [];
    velocityX = -7;
    gameOver = false;
    score.reset(); 
    document.getElementById('gameOverScreen').style.display = 'none';
    requestAnimationFrame(update);
}

function moveToBottom() {
    crab.y = laneHeights[0] - crabHeight / 2;
}

function moveToMiddle() {
    crab.y = laneHeights[1] - crabHeight / 2;
}

function moveToTop() {
    crab.y = laneHeights[2] - crabHeight / 2;
}

document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const musicLinkInput = document.getElementById('musicLink');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    playButton.addEventListener('click', function () {
        const musicLink = musicLinkInput.value.trim();
    
        if (musicLink) {
            backgroundMusic.src = musicLink;
            backgroundMusic.play().catch(error => {
                console.error("Error playing music: ", error);
            });
        } else {
            alert('https://music.youtube.com/watch?v=CVFkvTKfcqk&si=8WggMe0OCNym4aIE');
        }
    });
});
