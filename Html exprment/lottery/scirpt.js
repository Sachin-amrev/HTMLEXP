function placeBet() {
    let betAmount = parseFloat(document.getElementById('betAmount').value);
    let betOption = document.getElementById('betOption').value;
    let resultMessage = '';
    let winnings = 0;

    // Validation for empty bet or invalid input
    if (!betAmount || betAmount <= 0) {
        resultMessage = 'Please enter a valid bet amount!';
        document.getElementById('resultMessage').innerText = resultMessage;
        return;
    }

    // Lottery result logic based on selected bet option
    let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number for drawing
    let multiplier = 0;

    if (betOption === 'small' || betOption === 'big') {
        if (randomNumber <= 50) {
            resultMessage = 'You win! It was a Small number.';
            multiplier = 2; // Small or Big bet wins at 2x
        } else {
            resultMessage = 'Sorry, you lose. It was a Big number.';
            multiplier = 0;
        }
    } 
    else if (betOption === 'number') {
        if (randomNumber === 7) { // Example condition for number bet
            resultMessage = 'You win! It was the lucky Number 7!';
            multiplier = 9; // Number bet wins at 9x
        } else {
            resultMessage = 'Sorry, you lose. Try again!';
            multiplier = 0;
        }
    } 
    else if (betOption === 'green' || betOption === 'wallet') {
        if (randomNumber <= 20) { // Example for green/wallet option
            resultMessage = 'You win! It was the lucky color!';
            multiplier = 4.5; // Color bet wins at 4.5x
        } else {
            resultMessage = 'Sorry, you lose. Try again!';
            multiplier = 0;
        }
    }

    winnings = betAmount * multiplier;
    document.getElementById('resultMessage').innerText = resultMessage;

    if (winnings > 0) {
        document.getElementById('winningsMessage').innerText = `Congratulations! You won ₹${winnings.toFixed(2)}`;
    } else {
        document.getElementById('winningsMessage').innerText = 'Better luck next time!';
    }
}