import Score from './score.js';

let board;
let boardWidth = 1000;
let boardHeight = 600;
let context;

let crabWidth = 90;
let crabHeight = 150;
let crabX = 50;
let crabY = boardHeight / 2 - crabHeight / 2;
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
let laneHeights = [boardHeight / 6, boardHeight / 2, 5 * boardHeight / 6];

// let obstacle1Img;
// let obstacle2Img;
// let obstacle3Img;

//physics/speed
let velocityX = -7;
let gameOver = false;

let score;

window.onload = function () {
	board = document.getElementById('board');
	board.height = boardHeight;
	board.width = boardWidth;

	context = board.getContext('2d');
	score = new Score(context, 1);

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
}

function update() {
	if (gameOver) {
		score.setHighScore();
		return;
	}
  //context.drawImage(crabImg,crab.x, crab.y, crab.width, crab.height);
	context.clearRect(0, 0, board.width, board.height);
	score.update(1);
	score.draw();

  //crabbox
	context.fillStyle = 'red';
	context.fillRect(crab.x, crab.y, crab.width, crab.height);
	context.font = "50px serif";
	context.fillText("Z",crabX, laneHeights[0]);
	context.fillText("X",crabX, laneHeights[1]);
	context.fillText("C",crabX, laneHeights[2]);

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
			score.setHighScore();
			showGameOverScreen();
			return;
		}
	}
	requestAnimationFrame(update);
}

function placeObstacle() {
	let laneIndex = Math.floor(Math.random() * 3);
	let obstacleWidth;
	switch (laneIndex) {
	    case 0:
		obstacleWidth = obstacle1Width;
		break;
	    case 1:
		obstacleWidth = obstacle2Width;
		break;
	    case 2:
		obstacleWidth = obstacle3Width;
		break;
	}
	//Change velocity 
	if (velocityX >= -20){
	velocityX -= 0.1
	}
  	//place obstacle
	let obstacle = {
		x: boardWidth,
		y: laneHeights[laneIndex] - obstacleHeight / 2,
		width: obstacleWidth,
		height: obstacleHeight,
	}

	obstacleArray.push(obstacle);
}

function handleCollision(crab, obstacle) {
	return (
	    crab.x < obstacle.x + obstacle.width &&
	    crab.x + crab.width > obstacle.x &&
	    crab.y < obstacle.y + obstacle.height &&
	    crab.y + crab.height > obstacle.y
	)
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