window.onload = function () {
  const IMAGES_ARRAY = document.getElementById("images-array");
  const IMAGES_ARRAY_ADD = document.querySelector(".images-array-add");
  const IMAGES_ARRAY_HOLDER = document.querySelector(".images-array-holder");

  IMAGES_ARRAY_ADD.addEventListener("click", addImageToArray);
};

function addImageToArray() {
  const IMAGES_ARRAY = document.getElementById("images-array");
  const IMAGES_ARRAY_HOLDER = document.querySelector(".images-array-holder");


  const newImage = document.createElement("div");
  newImage.textContent = IMAGES_ARRAY.value;
  newImage.className = ("form-control form-images-array")
  IMAGES_ARRAY_HOLDER.appendChild(newImage);
  console.log("hello");
}
