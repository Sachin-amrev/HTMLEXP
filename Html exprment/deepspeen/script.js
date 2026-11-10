const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector(".spin-btn");
const resultText = document.getElementById("result");
const walletBalance = document.getElementById("wallet-balance");
const bankAccountInput = document.getElementById("bank-account");
const ifscCodeInput = document.getElementById("ifsc-code");
const withdrawAmountInput = document.getElementById("withdraw-amount");
const withdrawMessage = document.getElementById("withdraw-message");
const rechargeAmountInput = document.getElementById("recharge-amount");
const rechargeMessage = document.getElementById("recharge-message");
const upiOption = document.getElementById("upi-option");

// UPI Links for different apps
const upiLinks = {
  phonepe: "upi://pay?pa=9461933230@ybl&pn=YourName&mc=0000&tid=123456&tr=123456&tn=Recharge&am=100&cu=INR",
  googlepay: "upi://pay?pa=9461933230@okhdfcbank&pn=YourName&mc=0000&tid=123456&tr=123456&tn=Recharge&am=100&cu=INR",
  paytm: "upi://pay?pa=9461933230@paytm&pn=YourName&mc=0000&tid=123456&tr=123456&tn=Recharge&am=100&cu=INR",
};

// Event listener for UPI option change
upiOption.addEventListener("change", function () {
  const selectedOption = this.value;
  if (selectedOption && upiLinks[selectedOption]) {
    window.location.href = upiLinks[selectedOption];
  }
});

// Prizes array
const prizes = [
  { type: "text", value: "Smartphone" },
  { type: "text", value: "iPhone" },
  { type: "text", value: "₹300" },
  { type: "text", value: "₹400" },
  { type: "text", value: "₹500" },
  { type: "text", value: "₹600" },
  { type: "text", value: "₹700" },
  { type: "text", value: "₹800" },
];

let balance = 0;
let rechargeBalance = 0; // Separate balance for recharged amount
let playAmount = 0; // Track amount played

// Spin wheel function
function spinWheel() {
  // Disable button during spin
  spinBtn.disabled = true;

  // Random rotation
  const randomDegree = Math.floor(Math.random() * 360) + 1440; // 1440 = 4 full rotations
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  // Calculate prize
  setTimeout(() => {
    const actualDegree = randomDegree % 360;
    const prizeIndex = Math.floor((actualDegree + 22.5) / 45) % 8; // 45 = 360/8
    const prize = prizes[prizeIndex];

    // Show result
    if (prize.type === "text") {
      if (prize.value.startsWith("₹")) {
        const amount = parseInt(prize.value.replace("₹", ""));
        balance += amount;
        playAmount += amount; // Track played amount
      }
      resultText.innerText = `Congratulations! You won: ${prize.value}`;
    }

    walletBalance.innerText = `Wallet Balance: ₹${balance}`;
    spinBtn.disabled = false;
  }, 5000); // Wait for spin to finish
}

// Withdraw function
function withdrawAmount() {
  const bankAccount = bankAccountInput.value.trim();
  const ifscCode = ifscCodeInput.value.trim();
  const amount = parseInt(withdrawAmountInput.value);

  if (!bankAccount || !ifscCode) {
    withdrawMessage.innerText = "Please enter bank account details.";
    return;
  }

  if (isNaN(amount) || amount < 110) {
    withdrawMessage.innerText = "Minimum withdraw amount is ₹110.";
    return;
  }

  if (amount > balance - rechargeBalance) {
    withdrawMessage.innerText = "Insufficient balance (recharged amount cannot be withdrawn).";
    return;
  }

  if (amount > playAmount) {
    withdrawMessage.innerText = "You must play at least ₹" + amount + " to withdraw.";
    return;
  }

  balance -= amount;
  playAmount -= amount; // Deduct from played amount
  walletBalance.innerText = `Wallet Balance: ₹${balance}`;
  withdrawMessage.innerText = `₹${amount} withdrawn successfully!`;
  bankAccountInput.value = "";
  ifscCodeInput.value = "";
  withdrawAmountInput.value = "";
}

// Recharge function
function rechargeWallet() {
  const amount = parseInt(rechargeAmountInput.value);

  if (isNaN(amount) || amount <= 0) {
    rechargeMessage.innerText = "Please enter a valid amount.";
    return;
  }

  balance += amount;
  rechargeBalance += amount; // Track recharged amount
  walletBalance.innerText = `Wallet Balance: ₹${balance}`;
  rechargeMessage.innerText = `₹${amount} recharged successfully!`;
  rechargeAmountInput.value = "";
}