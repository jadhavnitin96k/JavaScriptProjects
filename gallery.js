const leftButton = document.getElementById("left-arrow");
const rightButton = document.getElementById("right-arrow");
const container = document.getElementById("container");

const imgArray = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"];

let i = 0;

rightButton.addEventListener("click", forwardImg);
leftButton.addEventListener("click", backwardImg);

//Change the image in the forward direction.
function forwardImg() {
  i++;
  if (i == imgArray.length) {
    i = 0;
  }
  container.style.backgroundImage = `url(images/${imgArray[i]})`;
}

//Change the image in the backward direction.
function backwardImg() {
  if (i == 0) {
    i = imgArray.length;
  }
  i--;
  container.style.backgroundImage = `url(images/${imgArray[i]})`;
}
