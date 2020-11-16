const delay = 6000; //ms

const width = 350;
const slides = document.querySelector(".slides");
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - 1) * width * -1;

let current = 0;

console.log(maxLeft);
function changeSlide(next = true) {
  if (next) {
    current += current > maxLeft ? -width : current * -1;
  } else {
    current = current < 0 ? current + width : maxLeft;
  }

  slides.style.left = current + "px";
}

let autoChange = setInterval(changeSlide, delay);
const restart = function() {
  clearInterval(autoChange);
  autoChange = setInterval(changeSlide, delay);
};

// Controls
document.querySelector(".next-slide").addEventListener("click", function() {
  changeSlide();
  restart();
});

document.querySelector(".prev-slide").addEventListener("click", function() {
  changeSlide(false);
  restart();
});
