export {}
const script = document.getElementById('teleprompter') as Element
const startButton = document.getElementById("btnStart")as Element
const progressElement = document.getElementById("progressStatus")as HTMLInputElement
let scrollHeight: number;
let currentPos: number;
let currentSpeed: number = 2;
let scrollLoop: number;
let isStarted: boolean = false;
//Add Event Listeners
(document.getElementById("btnFlipX")as Element).addEventListener("click", flipX);
startButton.addEventListener("click", startScroll);
script.addEventListener('scroll', updateProgressBar)

function flipX(): void {
  script.classList.toggle('flipX')
}

function startScroll(): void {
  isStarted = !isStarted
  startButton.textContent = (isStarted ? "⏸" : "▶")
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