const time = document.querySelector('.time')
const dateToday = document.querySelector('.date')
const greet = document.querySelector('.greeting')
const greetingTextInput = document.querySelector('.name')
const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')
const weatherIcon = document.querySelector('.weather-icon')
const weatherTemperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const inputCity = document.querySelector('.city')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
const selectLanguage = document.querySelector('.select-lang')
const settingsButton = document.querySelector('.settings')
const selectBackground = document.querySelector('.select-bg')

// time---------------------------------------------------------------

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString()
  time.textContent = `${currentTime}`
  showDate()
  showGreeting()
  setTimeout(showTime, 1000)
}
showTime()

// date----------------------------------------------------------------

function showDate() {
  const date = new Date();
  const options = {
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  };
  if (localStorage.getItem('langValue') == 'Russia') {
    const currentDate = date.toLocaleDateString('ru-RU', options)
    dateToday.textContent = `${currentDate}`
  } else {
    const currentDate = date.toLocaleDateString('en-US', options)
    dateToday.textContent = `${currentDate}`
  }


}

// getHours---------------------------------------------------------

function getHours() {
  const date = new Date()
  const hours = date.getHours()
  return hours
}

// TimeOfDayEn-------------------------------------------------------

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
  setTimeout(getTimeOfDay, 1000)
}

// TimeOfDayRU-------------------------------------------------------

function getTimeOfDayRu() {
  const timeOfDay = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи']
  if (getHours() < 12 && getHours() >= 6) {
    return timeOfDay[0]
  } else if (getHours() < 18 && getHours() >= 12) {
    return timeOfDay[1]
  } else if (getHours() <= 23 && getHours() >= 18) {
    return timeOfDay[2]
  } else if (getHours() < 6 && getHours() >= 0) {
    return timeOfDay[3]
  }
  setTimeout(getTimeOfDay, 1000)
}

// greeting --------------------------------------------------------

function showGreeting() {
  if (localStorage.getItem('langValue') == 'Russia') {
    const timeOfDay = getTimeOfDayRu()
    const greetingText = `${timeOfDay},`
    greet.textContent = greetingText
    greetingTextInput.placeholder = '[Введите имя]'
  } else {
    const timeOfDay = getTimeOfDay()
    const greetingText = `Good ${timeOfDay},`
    greet.textContent = greetingText
  }

}

// localStorage-------------------------------------------------------

function localStorageCity() {
  if (localStorage.getItem('city') === null) {
    localStorage.setItem('city', 'Minsk')
  }
  inputCity.value = localStorage.getItem('city')

  if (localStorage.getItem('backValue') === null) {
    localStorage.setItem('backValue', 'Github')
  }
}
localStorageCity()

function setLocalStorage() {
  localStorage.setItem('name', greetingTextInput.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    greetingTextInput.value = localStorage.getItem('name')
  }
}
window.addEventListener('load', getLocalStorage)

// randomNum---------------------------------------------------------

let randomNum;

function getRandomNum() {
  let max = 20
  let min = 1
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum;
}
getRandomNum()

// gitHub background----------------------------------------------------

function setBg() {
  let timeOfDay = getTimeOfDay()
  let bgNum = randomNum
  let num = bgNum < 10 ? ('0' + bgNum) : bgNum
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Lissaghu/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`

  if (localStorage.getItem('backValue') == 'Github') {
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${img.src})`
    })
  }


}
setBg()

// slide Next-----------------------------------------------------------

function getSlideNext() {
  if (randomNum < 20) {
    randomNum++
  } else if (randomNum == 20) {
    randomNum = 1
  }
  setBg()
  getLinkToImageUnsplash()
  getLinkToImageFlickr()
}

slideNext.addEventListener('click', getSlideNext)

// slide Prev-----------------------------------------------------------

function getSlidePrev() {
  if (randomNum > 1) {
    randomNum--
  } else if (randomNum == 1) {
    randomNum = 20
  }
  setBg()
  getLinkToImageUnsplash()
  getLinkToImageFlickr()
}

slidePrev.addEventListener('click', getSlidePrev)

// weather API----------------------------------------------------------

async function getWeather() {
  let url;
  if (localStorage.getItem('langValue') == 'Russia') {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=ru&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=3a8ea49517022bed16bfd3674732aec5&units=metric`
  }

  const res = await fetch(url)
  const data = await res.json()

  if (res.status == 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description

    if (localStorage.getItem('langValue') == 'Russia') {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
      humidity.textContent = `Влажность: ${data.main.humidity}%`
    } else {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
      humidity.textContent = `Humidity: ${data.main.humidity}%`
    }

    inputCity.value = data.name
    localStorage.setItem('city', inputCity.value)
  } else {
    weatherError.textContent = `Error! ${data.message} for ${inputCity.value}`
    weatherIcon.style.display = 'none'
    weatherTemperature.style.display = 'none'
    weatherDescription.style.display = 'none'
    wind.style.display = 'none'
    humidity.style.display = 'none'
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
inputCity.addEventListener('change', getWeather)

// quotes---------------------------------------------------------

async function getQuotes() {

  let quotes;

  if (localStorage.getItem('langValue') == 'Russia') {
    quotes = 'data.json'
  } else {
    quotes = 'dataEng.json'
  }

  const res = await fetch(quotes)
  const data = await res.json()

  let quoteText = data[Math.floor(Math.random() * 10)].text
  quote.textContent = quoteText

  for (let elem of data) {
    if (quoteText == elem.text) {
      author.textContent = elem.author
    }
  }
}
getQuotes()

changeQuote.addEventListener('click', getQuotes)

// select Languages--------------------------------------------------

function selectLanguageValue() {
  if (localStorage.getItem('langValue') === null) {
    localStorage.setItem('langValue', selectLanguage.value)
    location.reload()
  } else if (localStorage.getItem('langValue') != selectLanguage.value) {
    localStorage.setItem('langValue', selectLanguage.value)
    location.reload()
  }
}

function changeLanguage() {
  if (localStorage.getItem('langValue') == 'Russia') {
    document.querySelector('.language').textContent = 'Выбор языка'
    document.querySelector('.background-sourse').textContent = 'Выбор фона'
  }
}
changeLanguage()

selectLanguage.addEventListener('change', selectLanguageValue)

// settings-------------------------------------------------------------

function clickSetting(e) {

  const settingWrap = document.querySelector('.settings-wrap')
  let target = e.currentTarget

  if (!target.classList.contains('open')) {
    settingsButton.classList.add('open')
    settingWrap.style.opacity = '1'
  } else {
    settingsButton.classList.remove('open')
    settingWrap.style.opacity = ''
  }
}

settingsButton.addEventListener('click', clickSetting)

// select background----------------------------------------------------

function selectBackgroundValue() {
  if (localStorage.getItem('backValue') === null) {
    localStorage.setItem('backValue', selectBackground.value)
    location.reload()
  } else if (localStorage.getItem('backValue') != selectBackground.value) {
    localStorage.setItem('backValue', selectBackground.value)
    location.reload()
  }
}

selectBackground.addEventListener('change', selectBackgroundValue)

// select Unsplash-------------------------------------------------------

async function getLinkToImageUnsplash() {
  let timeOfDay = getTimeOfDay()
  let natureDay = `nature-${timeOfDay}`

  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${natureDay}&client_id=WwAot07b1Ke5fLmaHfzKAVjNaeBSpMfr17CQvts1hwg`
  const res = await fetch(url)
  const data = await res.json()
  const img = new Image();
  img.src = data.urls.regular

  if (localStorage.getItem('backValue') == 'Unsplash') {
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${img.src})`
    })
  }
}
getLinkToImageUnsplash()

// select Flickr-------------------------------------------------------

async function getLinkToImageFlickr() {
  const timeOfDay = getTimeOfDay()
  let galleryTimeOfDay;

  if (timeOfDay == 'night') {
    galleryTimeOfDay = '72157720062587146'
  } else if (timeOfDay == 'morning') {
    galleryTimeOfDay = '72157720069530982'
  } else if (timeOfDay == 'afternoon') {
    galleryTimeOfDay = '72157720111881805'
  } else if (timeOfDay == 'evening') {
    galleryTimeOfDay = '72157720111880160'
  }

  const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=0f15ff623f1198a1f7f52550f8c36057&gallery_id=${galleryTimeOfDay}&extras=url_h&format=json&nojsoncallback=1`
  const res = await fetch(url)
  const data = await res.json()

  const img = new Image();
  img.src = data.photos.photo[Math.floor(Math.random() * 16)].url_h


  if (localStorage.getItem('backValue') == 'Flickr') {
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${img.src})`
    })
  }
}
getLinkToImageFlickr()


