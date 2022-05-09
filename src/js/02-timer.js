// const flatpickr = require("flatpickr");
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose: function (selectedDates, dateStr, instance) {
      const currentTime = Date.now();
      selectedTime = Number(selectedDates[0].getTime());
        if (selectedTime <= currentTime) {
           Notiflix.Notify.failure("Please choose a date in the future");
           refs.startBtn.setAttribute("disabled", true);
        } else {
          refs.startBtn.removeAttribute("disabled");
           Notiflix.Notify.success("All's good! You may start the countdown");
           }
    },
};

flatpickr("#datetime-picker", options);

const refs = {
  startBtn: document.querySelector("[data-start]"),
   dayEl: document.querySelector('span[data-days]'),
  hourEl: document.querySelector('span[data-hours]'),
  minuteEl: document.querySelector('span[data-minutes]'),
  secondEl: document.querySelector('span[data-seconds]'),
};

const { startBtn, dayEl, hourEl, minuteEl, secondEl } = refs;



startBtn.setAttribute("disabled", true);
startBtn.addEventListener("click", onStartClick);

function onStartClick() {
  
 const intervalID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
   let { days, hours, minutes, seconds } = convertMs(deltaTime);
   
    updateClockface({ days, hours, minutes, seconds });
       if (deltaTime < 999) {
        clearInterval(intervalID);
      }
  },1000)
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  dayEl.textContent = days;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
}; 


