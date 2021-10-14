// custom videoPlayer----------------------------------

const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const video = document.querySelectorAll('.video_one')
const videoNext = document.querySelector('.video_arrow_right')
const videoPrev = document.querySelector('.video_arrow_left')
const playActive = document.querySelector('.play_active')
const pauseActive = document.querySelector('.pause_active')
const videoButtonPlay = document.querySelector('.video_one_button-play')
const videoImagePlay = document.querySelector('.video_one_button')
const line = document.querySelector('.progress__space-line')
const progress = document.querySelector('.progress__wrapper')
const redLine = document.querySelector('.progress__red-line')
const volumeOn = document.querySelector('.volume_on')
const volumeOff = document.querySelector('.volume_off')
const volumeJ = document.querySelector('.j-volume')
const fullscreen = document.querySelector('.fullscrin')
const fullscreenExit = document.querySelector('.fullscrin_exit')
const videoControls = document.querySelector('.section__video_one')
const videoControlsPlayer = document.querySelector('.video_controls')

play.addEventListener('click', playf)
pause.addEventListener('click', pausef)
videoNext.addEventListener('click', nextVideo)
videoNext.addEventListener('click', nextVideoPause)
videoPrev.addEventListener('click', prevVideo)
videoPrev.addEventListener('click', prevVideoPause)
videoButtonPlay.addEventListener('click', playf)
progress.addEventListener('click', clickProgress)
volumeOn.addEventListener('click', volumeOnF)
volumeOff.addEventListener('click', volumeOffF)
volumeJ.addEventListener('input', volumeInput)
fullscreen.addEventListener('click', fullscreenF)
fullscreenExit.addEventListener('click', fullscreenExitF)

window.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.code == 'Space') {
    e.preventDefault();
  }
});

video.forEach(item => {
  item.addEventListener('timeupdate', setVideoDuration)
  item.addEventListener('ended', videoEnd)
  item.addEventListener('keydown', (e) => {
    spacePlay(e)
  })
  item.addEventListener('click', togglePlay)
})

let currentVideo = 0

function togglePlay() {
  if (video[currentVideo].paused) {
    return playf()
  } return pausef()
}

function spacePlay(e) {
  if (e.code == 'Space') {
    video[currentVideo].paused ? playf() : pausef()
  } else if (e.code == 'KeyM') {
    video[currentVideo].volume !== 0 ? volumeOnF() : volumeOffF()
  } else if (e.code == 'KeyF') {
    document.fullscreenElement ? fullscreenExitF() : fullscreenF()
  } else if (e.shiftKey && e.code == 'Comma') {
    speedUp()
  } else if (e.shiftKey && e.code == 'Period') {
    speedDown()
  }
}

function playf() {
  video[currentVideo].play()
  playActive.style.display = 'none'
  pauseActive.style.display = 'block'
  videoButtonPlay.style.display = 'none'
}

function pausef() {
  video[currentVideo].pause();
  playActive.style.display = 'block'
  pauseActive.style.display = 'none'
  videoButtonPlay.style.display = 'block'
}

function nextVideo() {
  if (currentVideo == video.length) {
    currentVideo = 0
  }
  currentVideo++
  playActive.style.display = 'block'
  pauseActive.style.display = 'none'
  videoButtonPlay.style.display = 'block'
}

function prevVideo() {
  if (currentVideo == -1) {
    currentVideo = 4
  }
  currentVideo--
  videoButtonPlay.style.display = 'block'
}

function prevVideoPause() {
  if (video[currentVideo] == video[-1]) {
    video[currentVideo + 1].pause()
    video[currentVideo + 1].currentTime = 0
    currentVideo = 4
  }
  video[currentVideo + 1].pause()
  video[currentVideo + 1].currentTime = 0
}

function nextVideoPause() {
  if (video[currentVideo] == video[5]) {
    video[currentVideo - 1].pause()
    video[currentVideo - 1].currentTime = 0
    currentVideo = 0
  }
  video[currentVideo - 1].pause()
  video[currentVideo - 1].currentTime = 0
}

function progressUpdate() {
  let dur = video[currentVideo].duration
  let curDur = video[currentVideo].currentTime
  progress.value = (100 * curDur) / dur
}

function setVideoDuration() {
  const duration = Number(video[currentVideo].duration.toFixed());
  const current = Number(video[currentVideo].currentTime.toFixed());
  redLine.style.width = `${current / (duration / 100)}%`;
}

function clickProgress(event) {
  const clickProgressBar = (event.offsetX / progress.offsetWidth) * video[currentVideo].duration
  video[currentVideo].currentTime = clickProgressBar
}

function videoEnd() {
  playActive.style.display = 'block'
  pauseActive.style.display = 'none'
  videoButtonPlay.style.display = 'block'
}

function volumeOnF() {
  volumeOn.style.display = 'none'
  volumeOff.style.display = 'block'
  video[currentVideo].volume = 0
  volumeJ.value = 0
  volumeJ.style.background = '#C4C4C4'
}

function volumeOffF() {
  volumeOn.style.display = 'block'
  volumeOff.style.display = 'none'
  video[currentVideo].volume = 0.4
  volumeJ.value = 40
}

function volumeInput() {
  let v = volumeJ.value
  video[currentVideo].volume = v / 100
  if (video[currentVideo].volume == 0) {
    volumeOn.style.display = 'none'
    volumeOff.style.display = 'block'
  } else {
    volumeOn.style.display = 'block'
    volumeOff.style.display = 'none'
  }
}

function fullscreenF() {
  videoControls.requestFullscreen()
  fullscreen.style.display = 'none'
  fullscreenExit.style.display = 'block'
  video[currentVideo].classList.add('video_one_fullscreen')
  video[currentVideo].classList.remove('video_one')
  videoControls.classList.add('video_controls_fullscreen')
  videoControlsPlayer.style.left = '50%'
  videoControlsPlayer.style.transform = 'translateX(-50%)'
  videoImagePlay.style.left = '50%'
  videoImagePlay.style.top = '50%'
  videoImagePlay.style.transform = 'translate(-50%, -50%)'
}

function fullscreenExitF() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    videoControls.requestFullscreen()
  }
  video[currentVideo].classList.add('video_one')
  video[currentVideo].classList.remove('video_one_fullscreen')
  fullscreen.style.display = 'block'
  fullscreenExit.style.display = 'none'
  videoControlsPlayer.style.left = ''
  videoControlsPlayer.style.transform = ''
  videoImagePlay.style.left = ''
  videoImagePlay.style.top = ''
  videoImagePlay.style.transform = ''
}

function speedUp() {
  video[currentVideo].playbackRate += 0.1
}

function speedDown() {
  video[currentVideo].playbackRate -= 0.1
}






// progress gradient-----------------------------

[...document.querySelectorAll('.progress_style')].forEach(function (item) {
  item.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, 
      #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  })
})


// hamb menu------------------------------------

if (document.querySelectorAll(".hamb").length > 0) {
  document.querySelector(".hamb").onclick = toggleMobileMenu;
}
function toggleMobileMenu() {
  document.querySelector("html").classList.toggle("menu_open");
}


// slider welcome--------------------------------

$('.section__welcome_slider_container').slick({
  prevArrow: $('.welcome__arrow_left'),
  nextArrow: $('.welcome__arrow_right'),
  speed: 1000,
  dots: true,
  appendDots: $('.welcome__slider_dots'),
});


// slider explore--------------------------------

const slider = document.querySelector('.section__explore_slider_wrap')
const before = slider.querySelector('.explore_slider_before')
const beforeImage = before.querySelector('.explore_slider_before-pic')
const change = slider.querySelector('.explore_slider_change')
// const body = document.body;
const body = document.querySelector('.section__explore_slider_wrap')

let isActive = false

document.addEventListener('DOMContentLoaded', () => {
  let width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;
})

const beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
}

const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
}

body.addEventListener('mousedown', () => {
  isActive = true;
})

body.addEventListener('mouseup', () => {
  isActive = false;
})

body.addEventListener('mouseleave', () => {
  isActive = false;
})

body.addEventListener('mousemove', (e) => {
  if (!isActive) {
    return
  }
  let x = e.pageX;

  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(e);
})

body.addEventListener('touchstart', () => {
  isActive = true;
})

body.addEventListener('touchend', () => {
  isActive = false;
})

body.addEventListener('touchcancel', () => {
  isActive = false;
})

body.addEventListener('touchmove', (e) => {
  if (!isActive) {
    return
  }

  let x;
  let i;

  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(e);
})


// slider video section---------------------------

$('.section__video_slider-one').slick({
  prevArrow: $('.video_arrow_left'),
  nextArrow: $('.video_arrow_right'),
  swipe: false,
  dots: true,
  appendDots: $('.slider_dot_item_dot'),
  asNavFor: '.slider_video_two',
});


$('.slider_video_two').slick({
  prevArrow: $('.video_arrow_left'),
  nextArrow: $('.video_arrow_right'),
  swipe: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.section__video_slider-one',
});


// ticket section--------------------------------

const permanent = document.querySelector('.ticket_permanent')
const temporary = document.querySelector('.ticket_exhibition')
const combined = document.querySelector('.ticket_combined')

const buttonPrevBasic = document.querySelector('.prev_basic')
const buttonNextBasic = document.querySelector('.next_basic')
const buttonPrevSenior = document.querySelector('.prev_senior')
const buttonNextSenior = document.querySelector('.next_senior')
const inputBasic = document.querySelector('.input_basic')
const inputSenior = document.querySelector('.input_senior')
const allPrice = document.querySelector('.amount_total')

const basicPermanent = 20;
const basicTemporary = 25;
const basicCombined = 40;

const seniorPermanent = 10;
const seniorTemporary = 12.5;
const seniorCombined = 20;

permanent.addEventListener('click', pricePermanent)
temporary.addEventListener('click', priceTemporary)
combined.addEventListener('click', priceCombined)

function pricePermanent() {
  buttonNextBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicPermanent + inputSenior.value * seniorPermanent}`
  })
  buttonPrevBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicPermanent + inputSenior.value * seniorPermanent}`
  })
  buttonPrevSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorPermanent + inputBasic.value * basicPermanent}`
  })
  buttonNextSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorPermanent + inputBasic.value * basicPermanent}`
  })
}

function priceTemporary() {
  buttonNextBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicTemporary + inputSenior.value * seniorTemporary}`
  })
  buttonPrevBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicTemporary + inputSenior.value * seniorTemporary}`
  })
  buttonPrevSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorTemporary + inputBasic.value * basicTemporary}`
  })
  buttonNextSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorTemporary + inputBasic.value * basicTemporary}`
  })
}

function priceCombined() {
  buttonNextBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicCombined + inputSenior.value * seniorCombined}`
  })
  buttonPrevBasic.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputBasic.value * basicCombined + inputSenior.value * seniorCombined}`
  })
  buttonPrevSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorCombined + inputBasic.value * basicCombined}`
  })
  buttonNextSenior.addEventListener('click', () => {
    allPrice.innerText = `Total €${inputSenior.value * seniorCombined + inputBasic.value * basicCombined}`
  })
}



// mapBox----------------------------------------

mapboxgl.accessToken = 'pk.eyJ1IjoibGlzc2FnaHUiLCJhIjoiY2t1b2g3Z3ltMGVtMDJ3bWR2M2k4M2l2OCJ9.PviHQpficoBcUBvFo5Y9HA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 15.75,
});

// code from the next step will go here!

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'One',
      geometry: {
        type: 'Point',
        coordinates: [2.3364, 48.86091]
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France'
      }
    },
    {
      type: 'Two',
      geometry: {
        type: 'Point',
        coordinates: [2.3333, 48.8602]
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France'
      }
    },
    {
      type: 'Three',
      geometry: {
        type: 'Point',
        coordinates: [2.3397, 48.8607]
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France'
      }
    },
    {
      type: 'Four',
      geometry: {
        type: 'Point',
        coordinates: [2.3330, 48.8619]
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France'
      }
    },
    {
      type: 'Five',
      geometry: {
        type: 'Point',
        coordinates: [2.3365, 48.8625]
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France'
      }
    },
  ]
};
// add markers to map
for (const { geometry, properties } of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  //new mapboxgl.Marker(el).setLngLat(geometry.coordinates).addTo(map);

  new mapboxgl.Marker({
    color: "#757575",
  })
    .setLngLat(geometry.coordinates)
    .addTo(map);
}

new mapboxgl.Marker({
  color: "#171717",
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());




// function alertt() {
//   alert('Проверь пожалуйста в последний день cross-check, я не успел многое доделать, буду очень признателен)')
// }
// alertt()


