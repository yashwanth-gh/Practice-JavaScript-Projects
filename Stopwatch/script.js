const startButtonElement = document.querySelector(".start-btn");
const stopButtonElement = document.querySelector(".stop-btn");
const resetButtonElement = document.querySelector(".reset-btn");
const jsDisplay = document.querySelector(".display-time");
let timeVariable;
let clickedStart = false;
startButtonElement.addEventListener("click", () => {
  if(!clickedStart){
      clickedStart = true;
      timeVariable = setInterval(() => {
        startTimer()
    }, 100);
  }
});
stopButtonElement.addEventListener("click", () => {
pause();
});

let millis = 0;
let secs = 0;
let mins = 0;
let hrs = 0;

function startTimer(){
    millis++
    jsDisplay.innerHTML = `
    <span>${hrs}<sub>Hr</sub></span>
    <span>:${mins}<sub>min</sub></span>
    <span>:${secs}<sub>sec</sub></span>
    <span>:${millis}<sub>mil</sub></span>`
    if(millis === 9){
        secs++
        millis=0;
    }
    if(secs === 60){
        mins++
        secs=0;
    }
    if(mins === 60){ 
        hrs++
        mins=0;
    }
}

function pause(){
clearInterval(timeVariable);
clickedStart = false;
}


