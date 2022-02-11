import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    console.log(chosenDate);
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    if (Date.now() > chosenDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
  },
};

refs.startBtn.disabled = true;

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', countdownTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countdownTimer() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const dateDifference = chosenDate - currentDate;

    if (dateDifference <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = addLeadingZero(convertMs(dateDifference));
    refs.dataDays.textContent = `${days}`;
    refs.dataHours.textContent = `${hours}`;
    refs.dataMinutes.textContent = `${minutes}`;
    refs.dataSeconds.textContent = `${seconds}`;
  }, 1000);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const daysNum = String(days).padStart(2, 0);
  const hoursNum = String(hours).padStart(2, 0);
  const minutesNum = String(minutes).padStart(2, 0);
  const secondsNum = String(seconds).padStart(2, 0);
  return { days: daysNum, hours: hoursNum, minutes: minutesNum, seconds: secondsNum };
}
