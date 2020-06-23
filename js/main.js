'use strict';

let currentItem = 0;
const btn = document.querySelector('.carousel__btn');
const carousel = document.querySelector('.carousel');
const carouselList = document.querySelector('.carousel__wrap');
const itemCarousel = document.querySelectorAll('.carousel__item');
const itemWidth = itemCarousel[0].scrollWidth;

/*Create dots*/
const dotWrapper =  document.createElement("div");
dotWrapper.classList.add('carousel__dots-wrap');

for (let i = 0; i < itemCarousel.length; i++) {
  const dotItem =  document.createElement("span");
  dotItem.classList.add('carousel__dot');
  dotWrapper.append(dotItem);
} 

carousel.append(dotWrapper);
const dotCarousel = document.querySelector('.carousel__dots-wrap').children;
dotCarousel[currentItem].classList.add('carousel__dot_active');

/*Click to Btn */
btn.addEventListener('click', (e) => {
  if (btn.classList.contains('carousel__btn-next')) {
    if (currentItem >= itemCarousel.length - 2) {
      btn.classList.remove('carousel__btn-next'); 
      btn.classList.add('carousel__btn-prev'); 
    }
    currentItem++;
  } else {
    if (currentItem <= 1) {
      btn.classList.remove('carousel__btn-prev'); 
      btn.classList.add('carousel__btn-next'); 
    }
    currentItem--;
  }
  handlePosition(currentItem);
});

/*Click to dots */
[...dotCarousel].map((el, i) => {
  el.addEventListener('click', () => {
    handlePosition(i);
    currentItem = i;
  });
});



function handlePosition(i) {
  carouselList.style.transform = `translateX(-${i * itemWidth}px)`;

  [...dotCarousel].forEach((el) => {
    el.classList.remove('carousel__dot_active');
  });
 dotCarousel[i].classList.add('carousel__dot_active');
}


/*Img to svg*/

document.querySelectorAll('img[src$=".svg"').forEach(function(img){
  var imgID = img.id;
  var imgClass = img.className;
  var imgURL = img.src;

  fetch(imgURL).then(function(response) {
      return response.text();
  }).then(function(text){
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(text, "text/xml");
      var svg = xmlDoc.getElementsByTagName('svg')[0];
      if(typeof imgID !== 'undefined') {
          svg.setAttribute('id', imgID);
      }
      if(typeof imgClass !== 'undefined') {
          svg.setAttribute('class', imgClass+' replaced-svg');
      }
      svg.removeAttribute('xmlns:a');
      if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
      }
      img.parentNode.replaceChild(svg, img);
  });

});