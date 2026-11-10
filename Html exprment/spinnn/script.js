const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

const prizes = ["iPhone", "Smartphone", "₹500", "₹1000", "₹5000", "₹10000", "₹20000", "Thar"];
const colors = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff"];

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arc, false);
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.save();
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + arc / 2) * 150, 250 + Math.sin(angle + arc / 2) * 150);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 10);
        ctx.restore();
    }
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - (spinTime / spinTimeTotal * spinAngleStart);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    spinning = false;
    const degrees = startAngle * 180 / Math.PI + 90;
    const index = Math.floor((360 - (degrees % 360)) / (360 / prizes.length));
    result.innerText = `You won: ${prizes[index]}`;
}

spinBtn.addEventListener("click", () => {
    if (!spinning) {
        spinning = true;
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3000 + 3000;
        rotateWheel();
    }
});

drawWheel();