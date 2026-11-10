const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gunSound = document.getElementById("gunSound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 50;
        this.size = 30;
        this.speed = 7;
        this.health = 100;
        this.weapon = "pistol";
    }
    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = "white";
        ctx.fillText(`Health: ${this.health}`, this.x - 10, this.y - 10);
    }
    move(dir) {
        if (dir === "left" && this.x > 0) this.x -= this.speed;
        if (dir === "right" && this.x + this.size < canvas.width) this.x += this.speed;
    }
    changeWeapon(newWeapon) {
        this.weapon = newWeapon;
    }
}

class Bullet {
    constructor(x, y, speed, damage) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = speed;
        this.damage = damage;
    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.y -= this.speed;
    }
}

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = 30;
        this.speed = 2;
        this.health = 50;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            player.health -= 10;
            enemies.splice(enemies.indexOf(this), 1);
        }
    }
}

const player = new Player();
const bullets = [];
const enemies = [];

function spawnEnemy() {
    enemies.push(new Enemy());
}

setInterval