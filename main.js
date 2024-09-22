const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
  noButton.style.position = "absolute";
  noButton.style.left = Math.random() * 80 + "vw";
  noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
  popup.style.display = "block";
});

popup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Hide the popup initially
popup.style.display = "none";

let votes = 0;

// Function to initialize the vote count from localStorage
function initializeVotes() {
  const storedVotes = localStorage.getItem("voteCount"); // Get stored votes from localStorage
  if (storedVotes !== null) {
    votes = parseInt(storedVotes, 10); // Convert stored value to an integer
  }
  document.getElementById("voteCount").innerText = "Số lượt vote: " + votes; // Update the displayed vote count
}

// Function to cast a vote
function castVote() {
  votes++; // Increment vote count
  document.getElementById("voteCount").innerText = "Số lượt vote: " + votes; // Update vote count in the popup
  localStorage.setItem("voteCount", votes); // Save the new vote count in localStorage
}

// Function to send an email
// Function to prompt for full name and Date of Birth, then send the email
function promptUserInfo() {
  const fullName = prompt("Vui lòng nhập họ tên của bạn:");
  const day = prompt("Vui lòng nhập ngày sinh (1-31):");
  const month = prompt("Vui lòng nhập tháng sinh (1-12):");
  const year = prompt("Vui lòng nhập năm sinh (1900-2024):");

  // Validate full name and date of birth
  if (validateUserInfo(fullName, day, month, year)) {
    sendEmail(fullName, day, month, year); // If valid, send the email
  }
}

// Function to validate the full name and Date of Birth input
function validateUserInfo(fullName, day, month, year) {
  // Check if full name is provided
  if (fullName === null || fullName.trim() === "") {
    alert("Vui lòng nhập họ tên.");
    return false;
  }

  // Validate date of birth fields
  if (day === null || month === null || year === null) {
    alert("Vui lòng nhập đầy đủ thông tin ngày/tháng/năm sinh.");
    return false;
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    alert("Thông tin ngày tháng năm không hợp lệ. Vui lòng nhập số.");
    return false;
  }

  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2024
  ) {
    alert("Ngày tháng năm sinh không hợp lệ. Vui lòng kiểm tra lại.");
    return false;
  }

  return true; // Full name and Date of birth are valid
}

// Function to send the email using mailto
function sendEmail(fullName, day, month, year) {
  const recipient = "Dovanhaobn@gmail.com"; // Fixed recipient email
  const subject = encodeURIComponent(
    "Xác nhận thông tin không muốn tăng lương"
  ); // Email subject
  const body = encodeURIComponent(
    `Họ tên: ${fullName}\nNgày sinh: ${day}/${month}/${year}\nTôi xin được xác nhận thông tin của mình.`
  ); // Email body with full name and birth date
  const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`; // Construct mailto link

  window.location.href = mailtoLink; // Open the default email client
}

// Function to show the popup (optional, can be triggered manually or via events)
function showPopup() {
  document.getElementById("popup").classList.add("active");
}

// Initialize the votes when the page loads
initializeVotes();

// Automatically show the popup after 2 seconds (optional)
setTimeout(showPopup, 2000);
