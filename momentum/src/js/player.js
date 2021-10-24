const playerControls = document.querySelector('.player-controls')
const playListContainer = document.querySelector('.play-list')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const buttonPlayPause = document.querySelector('.play')
const durationTimer = document.querySelector('.duration-timer')
const duration = document.querySelector('.duration')
const currentDuration = document.querySelector('.current-duration')
const progressContainer = document.querySelector('.progress-main-line')
const progressTitle = document.querySelector('.progress-title')
const progressLine = document.querySelector('.progress-line')
const volumeButton = document.querySelector('.volume-icon')
const inputVolume = document.querySelector('.volume')


const playList = [
  {
    title: 'Aqua Caelestis',
    src: '../assets/sounds/Aqua Caelestis.mp3',
    duration: '00:40'
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
    audio.volume = 0.2
    inputVolume.value = 20
  } else if (isPlay) {
    audio.pause()
    isPlay = false
    buttonPlayPause.classList.remove('pause')
  }

  highlightSong()
  durationTimerFunc()
}

// nextTrack----------------------------------------------------------

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
  } else {
    isPlay = true
    buttonPlayPause.classList.add('pause')
  }
}

// prevTrack--------------------------------------------------------

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
  } else {
    isPlay = true
    buttonPlayPause.classList.add('pause')
  }
}

// create play-list -----------------------------------------------

playList.forEach(item => {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = item.title
  playListContainer.append(li)
})

// highlight song---------------------------------------------------

function highlightSong() {
  const li = document.querySelectorAll('.play-item')
  for (let i = 0; i < li.length; i++) {
    if (playNum == i) {
      li[i].classList.add('item-active')
      li[i].classList.add('play-item-pause')
    } else {
      li[i].classList.remove('item-active')
      li[i].classList.remove('play-item-pause')
    }
  }
}

// duration timer----------------------------------------------------

function durationTimerFunc() {
  for (let i = 0; i < playList.length; i++) {
    if (playNum == i) {
      duration.textContent = `${playList[i].duration}`
      progressTitle.textContent = `${playList[i].title}`
    }
  }
}

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
};

// Progress bar-------------------------------------------------------

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercents = currentTime / duration * 100
  progressLine.style.width = `${progressPercents}%`

  let seconds = Math.floor(audio.currentTime % 60)
  let minutes = Math.floor((audio.currentTime / 60) % 60)

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  currentDuration.textContent = minutes + ':' + seconds
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// volume ---------------------------------------------------------------

function volumeOff() {
  if (audio.volume > 0) {
    volumeButton.classList.add('volume-icon-muted')
    audio.volume = 0
    inputVolume.value = 0
  } else {
    volumeButton.classList.remove('volume-icon-muted')
    audio.volume = 1
    inputVolume.value = 100
  }
}

function inputVolumeFunc() {
  let v = inputVolume.value
  audio.volume = v / 100
  if (audio.volume == 0) {
    volumeButton.classList.add('volume-icon-muted')
  } else {
    volumeButton.classList.remove('volume-icon-muted')
  }
}

// play-item---------------------------------------------------------------

const playItem = document.querySelectorAll('.play-item')

function removePause() {
  playItem.forEach(item => {
    item.classList.remove('play-item-pause')
  })
}

function currentItemPlay() {
  playItem.forEach((item, index, array) => {
    item.addEventListener('click', (e) => {

      let target = e.currentTarget

      setTimeout(() => {
        removePause()
        if (target.classList.contains('item-active')) {
          !audio.paused ? item.classList.add('play-item-pause') : item.classList.remove('play-item-pause')
        }
      }, 1)

      playNum = index
      return playPauseAudio()
    })

  })
}
currentItemPlay()

function playPauseTrack() {
  for (let elem of playItem) {
    if (elem.classList.contains('item-active')) {
      !audio.paused ? elem.classList.add('play-item-pause') : elem.classList.remove('play-item-pause')
    }
  }
}


// eventListeners-----------------------------------------------------------

buttonPlayPause.addEventListener('click', playPauseAudio)
playPrev.addEventListener('click', playPrevFunc)
playNext.addEventListener('click', playNextFunc)
audio.addEventListener('ended', playNextFunc)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
inputVolume.addEventListener('input', inputVolumeFunc)
volumeButton.addEventListener('click', volumeOff)
buttonPlayPause.addEventListener('click', playPauseTrack)
playNext.addEventListener('click', playPauseTrack)

