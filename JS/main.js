//handel header functions
let sideMenu = document.querySelector(".menu");
let menuIcon = document.querySelector(".menu-icon");
let closeBtn = document.querySelector(".close");
let catMenu = document.querySelector(".categories");
let dropMenu = document.querySelector(".drop-menu");

console.log(catMenu, dropMenu);

menuIcon.addEventListener("click", () => {
  sideMenu.style.left = "-46px";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-350px";
});

catMenu.addEventListener("click", ()=> {
  dropMenu.classList.toggle("toggled")
})

// get products
async function getProducts() {
  let data = await fetch("../products.json");
  let products = await data.json();
  console.log(products);
}

getProducts();
