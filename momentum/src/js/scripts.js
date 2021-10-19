const time = document.querySelector('.time')
const dateToday = document.querySelector('.date')
const greet = document.querySelector('.greeting')
const greetingText = document.querySelector('.name')
const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString()
  time.textContent = `${currentTime}`
  showDate()
  showGreeting()
  setTimeout(showTime, 1000)
}
showTime()

function showDate() {
  const date = new Date();
  const options = {
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  };
  const currentDate = date.toLocaleDateString('en-US', options)
  dateToday.textContent = `${currentDate}`
}

function getHours() {
  const date = new Date()
  const hours = date.getHours()
  return hours
}

function getTimeOfDay() {
  const timeOfDay = ['morning', 'afternoon', 'evening', 'night']
  if (getHours() < 12 && getHours() >= 6) {
    return timeOfDay[0]
  } else if (getHours() < 18 && getHours() >= 12) {
    return timeOfDay[1]
  } else if (getHours() <= 23 && getHours() >= 18) {
    return timeOfDay[2]
  } else if (getHours() < 6 && getHours() >= 0) {
    return timeOfDay[3]
  }
  setTimeout(getTimeOfDay, 10000)
}

function showGreeting() {
  const timeOfDay = getTimeOfDay()
  const greetingText = `Good ${timeOfDay}`
  greet.textContent = greetingText
}

function setLocalStorage() {
  localStorage.setItem('name', greetingText.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    greetingText.value = localStorage.getItem('name')
  }
}
window.addEventListener('load', getLocalStorage)

let randomNum;

function getRandomNum() {
  let max = 20
  let min = 1
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum;
}
getRandomNum()

function setBg() {
  let timeOfDay = getTimeOfDay()
  let bgNum = getRandomNum()
  let num = bgNum < 10 ? ('0' + bgNum) : bgNum
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Lissaghu/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`
  })
}
setBg()

function getSlideNext() {
  if (randomNum <= 20) {
    randomNum++
  } else if (randomNum == 21) {
    randomNum == 1
  }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)

function getSlidePrev() {
  if (randomNum > 1) {
    randomNum--
  } else if (randomNum == 0) {
    randomNum == 20
  }
  setBg()
}

slidePrev.addEventListener('click', getSlidePrev)