const play = document.querySelector('.play');
const pause = document.querySelector('.pause');

let video = document.querySelector('.video_one')

function playf() {
  video.play();
}
function pausef() {
  video.pause();
}

play.onclick = playf;
pause.onclick = pausef;

[...document.querySelectorAll('.progress_style')].forEach(function (item) {
  item.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, 
      #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`
  })
})

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
const body = document.body;

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





