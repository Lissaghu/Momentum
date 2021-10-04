let images = [
  './assets/img/gallery/galery1.jpg',
  './assets/img/gallery/galery2.jpg',
  './assets/img/gallery/galery3.jpg',
  './assets/img/gallery/galery4.jpg',
  './assets/img/gallery/galery5.jpg',
  './assets/img/gallery/galery6.jpg',
  './assets/img/gallery/galery7.jpg',
  './assets/img/gallery/galery8.jpg',
  './assets/img/gallery/galery9.jpg',
  './assets/img/gallery/galery10.jpg',
  './assets/img/gallery/galery11.jpg',
  './assets/img/gallery/galery12.jpg',
  './assets/img/gallery/galery13.jpg',
  './assets/img/gallery/galery14.jpg',
  './assets/img/gallery/galery15.jpg'
]

const shuffle = arr => arr.sort(() => Math.random() - 0.5)

function addPicture(array) {
  shuffle(array).forEach(elem => {
    let pic = document.createElement('img')
    pic.setAttribute('src', elem)
    pic.classList.add('section__gallery_item')
    document.querySelector('.section__gallery_inner-container').append(pic)
  })
}

addPicture(images)
