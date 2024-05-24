export default class Score {
    score = 0;
    HIGH_SCORE_KEY = "highScore";
    buttonCreated = false;  


    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;


        if (Math.floor(this.score) >= 25 && !this.buttonCreated) {
            this.createButton();
            this.buttonCreated = true;
        }
    }

    reset() {
        this.score = 0;
        this.buttonCreated = false;  // Reset the button creation flag
    }

    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        if (!highScore || this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
        }
    }

    draw() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        const y = 20 * this.scaleRatio;
        const fontSize = 20 * this.scaleRatio;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillStyle = "#525250";
        const scoreX = this.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;
        const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    
        this.ctx.fillText(scorePadded, scoreX, y);
        const highScorePadded = Math.floor(highScore).toString().padStart(6, 0);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }

    createButton() {
        const button = document.createElement("button");
        button.innerText = "Next Level";
        button.style.position = "absolute";
        button.style.top = "50%";
        button.style.left = "50%";
        button.style.transform = "translate(-50%, -50%)";
        button.style.padding = "10px 20px";
        button.style.fontSize = "16px";

        document.body.appendChild(button);

        button.addEventListener("click", () => {
            alert("Button clicked!");
        });
    }

}
