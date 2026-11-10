const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const result = document.getElementById("result");

const prizes = ["iPhone", "₹500", "₹1000", "Smartwatch", "₹250", "₹2000"];
const colors = ["red", "yellow", "green", "blue", "orange", "pink"];
const totalSlices = prizes.length;
let spinning = false;
let rotation = 0;

// 🛠️ Wheel Draw Function
function drawWheel() {
    const sliceAngle = (2 * Math.PI) / totalSlices;
    for (let i = 0; i < totalSlices; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, sliceAngle * i, sliceAngle * (i + 1));
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        // 🏆 Add Prize Text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(prizes[i], 120 + 100 * Math.cos(sliceAngle * (i + 0.5)), 150 + 100 * Math.sin(sliceAngle * (i + 0.5)));
    }
}

// 🌀 Spin Function
function spinWheel() {
    if (spinning) return;
    spinning = true;

    let randomDegree = Math.floor(3600 + Math.random() * 360);
    let duration = 3000; // 3 sec

    let startTime = null;
    function animateWheel(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let easing = 1 - Math.pow(1 - progress / duration, 3); // Smooth easing
        rotation = easing * randomDegree;

        canvas.style.transform = `rotate(${rotation}deg)`;

        if (progress < duration) {
            requestAnimationFrame(animateWheel);
        } else {
            let finalDegree = rotation % 360;
            let sliceSize = 360 / totalSlices;
            let selectedIndex = Math.floor((360 - finalDegree) / sliceSize) % totalSlices;

            result.innerText = `You Won: ${prizes[selectedIndex]}! 🎉`;
            spinning = false;
        }
    }
    requestAnimationFrame(animateWheel);
}

// 🎯 Event Listener
spinButton.addEventListener("click", spinWheel);

// 🖌️ Draw the wheel on load
drawWheel();