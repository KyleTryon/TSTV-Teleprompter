const script = document.getElementById("teleprompter");
const startButton = document.getElementById("btnStart");
const progressElement = document.getElementById("progressStatus");
let scrollHeight;
let currentPos;
let currentSpeed = 2;
let scrollLoop;
let isStarted = false;
document.getElementById("btnFlipX").addEventListener("click", flipX);
startButton.addEventListener("click", startScroll);
script.addEventListener("scroll", updateProgressBar);
function flipX() {
  script.classList.toggle("flipX");
}
function startScroll() {
  isStarted = !isStarted;
  startButton.textContent = isStarted ? "\u23F8" : "\u25B6";
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
