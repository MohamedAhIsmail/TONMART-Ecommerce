//handel header functions
let sideMenu = document.querySelector(".menu");
let menuIcon = document.querySelector(".menu-icon");
let closeBtn = document.querySelector(".close");
let catMenu = document.querySelector(".categories");
let dropMenu = document.querySelector(".drop-menu");

menuIcon.addEventListener("click", () => {
  sideMenu.style.left = "-46px";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-350px";
});

catMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("toggled");
});

// Initialize Swiper
var swiper = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullests: true,
    clickable: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});

// get products
async function getProducts() {
  let data = await fetch("../products.json");
  let products = await data.json();
  console.log(products);
}

getProducts();
