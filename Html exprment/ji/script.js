function openGift() {
    document.getElementById("message").style.display = "block";
}

document.getElementById("typeBox").addEventListener("input", function() {
    let balloons = document.getElementById("balloons");
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.innerHTML = "🎈";
    balloon.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 4000);
});