import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),

}
  
const { submitEl, delayEl, stepEl, amountEl } = refs;
submitEl.addEventListener("submit", onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    console.log(delay)
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
    
}


function generatePromises(delay, step, amount) {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 6000,
        });
      })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 6000,
        });
        });
          console.log(delay)
    delay += step;
  }
}


function onSubmit(evt) {
  evt.preventDefault();
  const delay = +delayEl.value;
  const step = +stepEl.value;
  const amount = +amountEl.value; 
  generatePromises(delay, step, amount);
}




