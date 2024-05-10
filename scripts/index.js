



let board;
let boardWidth = 1000;
let boardHeight = 600;
let context;

let crabWidth = 90;
let crabHeight = 150;
let crabX = 50;
let crabY = boardHeight - crabHeight;
// let crabImg;

let crab = {
	x: crabX,
	y: crabY,
	width: crabWidth,
	height: crabHeight,
}

//obstacle - plastic, bottles, etc
let obstacleArray = [];

let obstacle1Width = 130;
let obstacle2Width = 150;
let obstacle3Width = 160;

let obstacleHeight = 90;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

// let obstacle1Img;
// let obstacle2Img;
// let obstacle3Img;

//physics/speed
let velocityX = -10;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;

window.onload = function () {
	board = document.getElementById('board');
	board.height = boardHeight;
	board.width = boardWidth;

	context = board.getContext('2d');

  //crabimage
  // crabImg = new Image();
  // crabImg.src = "./img/...";
  // crabImg.onload = function() {
  //     context.drawImage(crabImg,crab.x, crab.y, crab.width, crab.height);
  // }
  // obstacle1Img = new Image();
  // obstacle1Img.src = "./img/obstacle1.src";

  // obstacle2Img = new Image();
  // obstacle2Img.src = "./img/obstacle2.src";

  // obstacle3Img = new Image();
  // obstacle3Img.src = "./img/obstacle3.src";

	requestAnimationFrame(update);
	setInterval(placeObstacle, 1000);
}

function update() {
	requestAnimationFrame(update);

  //context.drawImage(crabImg,crab.x, crab.y, crab.width, crab.height);
	context.clearRect(0, 0, board.width, board.height);

  //crabbox
	context.fillStyle = 'red';
	context.fillRect(crab.x, crab.y, crab.width, crab.height);

	for (let i = 0; i < obstacleArray.length; i++) {
		let obstacle = obstacleArray[i];
		obstacle.x += velocityX;
		context.fillStyle = 'white';
		context.fillRect(
			obstacle.x,
			obstacle.y,
			obstacle.width,
			obstacle.height
		)

		if (handleCollision(crab, obstacle)) {
			gameOver = true;
			alert('Game Over! Try Again');
			restartGame();
			return;
		}
	}
}

function placeObstacle() {

  //place obstacle
	let obstacle = {
		x: obstacleX,
		y: obstacleY,
		width: null,
		height: obstacleHeight,
	}

	let placeObstacleChance = Math.random();

	if (placeObstacleChance > 0.9) {
		obstacle.width = obstacle3Width;
		obstacleArray.push(obstacle);
	} else if (placeObstacleChance > 0.7) {
		obstacle.width = obstacle2Width;
		obstacleArray.push(obstacle);
	} else if (placeObstacleChance > 0.5) {
		obstacle.width = obstacle1Width;
		obstacleArray.push(obstacle);
	}
}

function handleCollision(crab, obstacle) {
	return (
		crab.x < obstacle.x + obstacle.width &&
		crab.x + crab.width > obstacle.x &&
		crab.y < obstacle.y + obstacle.height &&
		crab.y + crab.height > obstacle.y
	)
}

function restartGame() {
	crab.x = crabX;
	crab.y = crabY;
	obstacleArray = [];
	gameOver = false;
}


document.addEventListener("keydown", function(event) {
    if (event.key === "z") {
        moveToBottom();
    }
    if (event.key === "x") {
        movetoMiddle();
    }
    if (event.key === "c") {
        moveToTop();
    }
});

function moveToBottom() {
    crabHeight = 150;
    console.log("Moved to bottom lane");
}

function movetoMiddle() {
    crabHeight = 300;
    console.log("Moved to middle lane");
}

function moveToTop() {
    crabHeight = 450;
    console.log("Moved to top lane");
}