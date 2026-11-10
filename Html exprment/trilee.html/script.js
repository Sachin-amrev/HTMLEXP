const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = { x: 50, y: canvas.height / 2, width: 20, height: 20 };
let bullets = [];
let enemies = [];

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    requestAnimationFrame(updateGame);
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        bullets.push({ x: player.x + 20, y: player.y + 10 });
    }
});

updateGame();