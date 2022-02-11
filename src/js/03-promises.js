import Notiflix from 'notiflix';

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

const startBtn = document.querySelector('.form');

startBtn.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();

  const inputRefs = e.currentTarget.elements;
  const delayValue = inputRefs.delay.value;
  const stepValue = inputRefs.step.value;
  const amountValue = inputRefs.amount.value;

  let totalDelay = Number(delayValue);

  for (let i = 1; i <= Number(amountValue); i += 1) {
    if (i === 1) {
      createPromise(i, totalDelay).then(logSuccess).catch(logError);
    } else {
      totalDelay += Number(stepValue);
      createPromise(i, totalDelay).then(logSuccess).catch(logError);
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const logSuccess = ({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const logError = ({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
