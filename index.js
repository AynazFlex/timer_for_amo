const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const formater = (num) => num > 9 ? num : `0${num}`
    let acum = 0
    let start = Date.now()

    const func = (num) => {
      const hh = Math.floor(num/3600)
      const mm = Math.floor((num - hh*3600)/60)
      const ss = num - hh*3600 - mm*60
      timerEl.textContent = `${formater(hh)}:${formater(mm)}:${formater(ss)}`
    }

    func(seconds - acum)

    setTimeout(function run() {
      acum++
      func(seconds - acum)
      if(seconds > acum) {
        const delta = (Date.now() - start) - 1000*acum
        setTimeout(run, 1000 - delta)
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', ({target}) => {
  target.value = target.value.replace(/\D/g, '')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
