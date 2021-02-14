export {}
const script = document.getElementById('teleprompter') as HTMLInputElement
const startButton = document.getElementById("btnStart")as Element
const progressElement = document.getElementById("progressStatus")as HTMLInputElement
let scrollHeight: number;
let currentPos: number;
let currentSpeed: number = 2;
let maxSpeed: number = 25;
let minSpeed: number = -10
let scrollLoop: number;
let isStarted: boolean = false;
//Add Event Listeners
(document.getElementById("btnFlipX")as Element).addEventListener("click", flipX);
(document.getElementById("btnSizeUp")as Element).addEventListener("click", () => {changeSize(4)});
(document.getElementById("btnSizeDown")as Element).addEventListener("click", () => {changeSize(-4)});
(document.getElementById("btnSpeedUp")as Element).addEventListener("click", () => {changeSpeed(1)});
(document.getElementById("btnSpeedDown")as Element).addEventListener("click", () => {changeSpeed(-1)});
startButton.addEventListener("click", startScroll);
script.addEventListener('scroll', updateProgressBar)

function flipX(): void {
  script.classList.toggle('flipX')
}

function startScroll(): void {
  isStarted = !isStarted
  const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
  const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/></svg>'
  startButton.innerHTML = (isStarted ? pauseIcon : playIcon)
  scrollHeight = script.scrollHeight
  console.log("Height of script: ", scrollHeight)
  if (isStarted) {
    scrollLoop = setInterval(()=> {
      console.log("current position: ", currentPos)
      currentPos = script.scrollTop
      scroll(currentPos+currentSpeed)
      updateProgressBar()
    },30)
  } else {
    clearInterval(scrollLoop)
  }
}

function scroll(num: number): void {
  script.scroll({
    behavior: "auto",
    top: num
  })
}

function updateProgressBar(): void {
  currentPos = script.scrollTop
  scrollHeight = script.scrollHeight
  const amount = Math.floor(((currentPos + script.clientHeight) / scrollHeight) * 100)
  progressElement.value = amount.toString()
}

function changeSpeed(amount: number) {
  console.log("Changing Speed")
  if ( amount + currentSpeed > minSpeed && amount + currentSpeed < maxSpeed ) {
    currentSpeed += amount
  }
}

function changeSize(amount: number) {
  const currentSize = parseInt(window.getComputedStyle(script).fontSize, 10)
  script.style.fontSize = (currentSize + amount) + "px"
}