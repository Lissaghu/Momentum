const playerControls = document.querySelector('.player-controls')
const playListContainer = document.querySelector('.play-list')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const buttonPlayPause = document.querySelector('.play')

const playList = [
  {
    title: 'Aqua Caelestis',
    src: '../assets/sounds/Aqua Caelestis.mp3',
    duration: '00:58'
  },
  {
    title: 'Ennio Morricone',
    src: '../assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  },
  {
    title: 'River Flows In You',
    src: '../assets/sounds/River Flows In You.mp3',
    duration: '01:37'
  },
  {
    title: 'Summer Wind',
    src: '../assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  }
]

const audio = new Audio();

let playNum = 0
let isPlay = false

function playPauseAudio() {
  audio.src = playList[playNum].src
  audio.currentTime = 0
  if (!isPlay) {
    audio.play()
    isPlay = true
    buttonPlayPause.classList.add('pause')

  } else if (isPlay) {
    audio.pause()
    isPlay = false
    buttonPlayPause.classList.remove('pause')
  }
  highlightSong()
}

function playNextFunc() {
  playNum++

  if (playNum == playList.length) {
    playNum = 0
  }

  playPauseAudio()
  audio.play()

  if (audio.paused) {
    isPlay = false
    buttonPlayPause.classList.remove('pause')
  }
  isPlay = true
  buttonPlayPause.classList.add('pause')
}

function playPrevFunc() {

  if (playNum > 0) {
    playNum--
  } else if (playNum == 0) {
    playNum = playList.length - 1
  }

  playPauseAudio()
  audio.play()

  if (audio.paused) {
    isPlay = false
    buttonPlayPause.classList.remove('pause')
  }
  isPlay = true
  buttonPlayPause.classList.add('pause')
}

playList.forEach(item => {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = item.title
  playListContainer.append(li)
})

function highlightSong() {
  const li = document.querySelectorAll('.play-item')
  for (let i = 0; i < li.length; i++) {
    if (playNum == i) {
      li[i].classList.add('item-active')
    } else {
      li[i].classList.remove('item-active')
    }
  }
}


buttonPlayPause.addEventListener('click', playPauseAudio)
playPrev.addEventListener('click', playPrevFunc)
playNext.addEventListener('click', playNextFunc)
audio.addEventListener('ended', playNextFunc)
