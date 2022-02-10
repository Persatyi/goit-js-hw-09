function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyElement = document.body;

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangeColor);

let timerId = null;

stopBtn.setAttribute('disabled', 'disabled');

function changeColor() {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
  clearInterval(timerId);
}
