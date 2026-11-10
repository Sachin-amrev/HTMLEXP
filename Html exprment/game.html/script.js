const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let birdY = 200;
let gravity = 2;
let jumpPower = 35;
let isGameOver = false;
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        birdY -= jumpPower;
    }
});

function createPipe() {
    let pipeGap = 150;
    let randomHeight = Math.floor(Math.random() * 150) + 100;
    
    let topPipe = document.createElement("div");
    topPipe.classList.add("pipe", "top-pipe");
    topPipe.style.height = `${randomHeight}px`;
    topPipe.style.left = "400px";

    let bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe", "bottom-pipe");
    bottomPipe.style.height = `${500 - randomHeight - pipeGap}px`;
    bottomPipe.style.left = "400px";

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    let pipeInterval = setInterval(() => {
        let pipeX = parseInt(topPipe.style.left);
        pipeX -= 3;

        if (pipeX < -50) {
            clearInterval(pipeInterval);
            topPipe.remove();
            bottomPipe.remove();
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
        } else {
            topPipe.style.left = `${pipeX}px`;
            bottomPipe.style.left = `${pipeX}px`;
        }

        if (isGameOver) {
            clearInterval(pipeInterval);
        }
    }, 20);
}

setInterval(createPipe, 2000);

function updateGame() {
    if (!isGameOver) {
        birdY += gravity;
        bird.style.top = `${birdY}px`;

        if (birdY > 470 || birdY < 0) {
            isGameOver = true;
            alert("Game Over! Final Score: " + score);
            location.reload();
        }
    }

    requestAnimationFrame(updateGame);
}

updateGame();