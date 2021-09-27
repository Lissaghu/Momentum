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

// const progress = document.querySelectorAll('.progress_style');
// progress.addEventListener('input', function () {
//   const value = this.value;
//   this.style.background = `linear-gradient(to right, 
//     #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`
// })

[...document.querySelectorAll('.progress_style')].forEach(function (item) {
  item.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, 
      #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`
  })
})



