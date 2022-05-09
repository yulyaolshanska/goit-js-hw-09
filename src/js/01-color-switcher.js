const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
    body: document.querySelector('body'),

}

let timerId = null;

refs.startBtn.addEventListener("click", onStartSwitcher);
refs.stopBtn.addEventListener("click", onStopSwitcher);
refs.stopBtn.setAttribute("disabled", true);

console.log(refs.startBtn)
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartSwitcher() {
    refs.startBtn.setAttribute("disabled", true);
    refs.stopBtn.removeAttribute("disabled");
    timerId = setInterval(() => refs.body.style.backgroundColor = getRandomHexColor(), 1000);


}

function onStopSwitcher() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute("disabled");
    refs.stopBtn.setAttribute("disabled", true);
}