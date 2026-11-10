const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = { x: 50, y: canvas.height / 2, width: 20, height: 20, speed: 5 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach((bullet, index) => {
        bullet.x += 5;
        ctx.fillRect(bullet.x, bullet.y, 10, 5);

        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach((enemy, index) => {
        enemy.x -= 2;
        ctx.fillRect(enemy.x, enemy.y, 20, 20);

        if (enemy.x < 0) {
            enemies.splice(index, 1);
        }
    });
}

function spawnEnemy() {
    let enemy = { x: canvas.width, y: Math.random() * canvas.height, width: 20, height: 20 };
    enemies.push(enemy);
}

setInterval(spawnEnemy, 2000);

function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();

    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + 10 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 5 > enemy.y) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score++;
                document.getElementById("score").innerText = score;
            }
        });
    });

    enemies.forEach((enemy) => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            gameOver = true;
            alert("Game Over! Final Score: " + score);
            document.location.reload();
        }
    });

    requestAnimationFrame(updateGame);
}

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp" && player.y > 0) player.y -= player.speed;
    if (e.code === "ArrowDown" && player.y < canvas.height - player.height) player.y += player.speed;
    if (e.code === "ArrowLeft" && player.x > 0) player.x -= player.speed;
    if (e.code === "ArrowRight" && player.x < canvas.width - player.width) player.x += player.speed;
    if (e.code === "Space") {
        bullets.push({ x: player.x + 20, y: player.y + 10 });
    }
});

updateGame();