const script = document.getElementById("teleprompter");
const startButton = document.getElementById("btnStart");
const progressElement = document.getElementById("progressStatus");
let scrollHeight;
let currentPos;
let currentSpeed = 2;
let maxSpeed = 25;
let minSpeed = -10;
let scrollLoop;
let isStarted = false;
document.getElementById("btnFlipX").addEventListener("click", flipX);
document.getElementById("btnSizeUp").addEventListener("click", () => {
  changeSize(4);
});
document.getElementById("btnSizeDown").addEventListener("click", () => {
  changeSize(-4);
});
document.getElementById("btnSpeedUp").addEventListener("click", () => {
  changeSpeed(1);
});
document.getElementById("btnSpeedDown").addEventListener("click", () => {
  changeSpeed(-1);
});
startButton.addEventListener("click", startScroll);
script.addEventListener("scroll", updateProgressBar);
function flipX() {
  script.classList.toggle("flipX");
}
function startScroll() {
  isStarted = !isStarted;
  const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
  const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/></svg>';
  startButton.innerHTML = isStarted ? pauseIcon : playIcon;
  scrollHeight = script.scrollHeight;
  console.log("Height of script: ", scrollHeight);
  if (isStarted) {
    scrollLoop = setInterval(() => {
      console.log("current position: ", currentPos);
      currentPos = script.scrollTop;
      scroll(currentPos + currentSpeed);
      updateProgressBar();
    }, 30);
  } else {
    clearInterval(scrollLoop);
  }
}
function scroll(num) {
  script.scroll({
    behavior: "auto",
    top: num
  });
}
function updateProgressBar() {
  currentPos = script.scrollTop;
  scrollHeight = script.scrollHeight;
  const amount = Math.floor((currentPos + script.clientHeight) / scrollHeight * 100);
  progressElement.value = amount.toString();
}
function changeSpeed(amount) {
  console.log("Changing Speed");
  if (amount + currentSpeed > minSpeed && amount + currentSpeed < maxSpeed) {
    currentSpeed += amount;
  }
}
function changeSize(amount) {
  const currentSize = parseInt(window.getComputedStyle(script).fontSize, 10);
  script.style.fontSize = currentSize + amount + "px";
}
