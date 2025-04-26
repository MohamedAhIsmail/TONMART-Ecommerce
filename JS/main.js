//handel header functions
let sideMenu = document.querySelector(".menu");
let menuIcon = document.querySelector(".menu-icon");
let closeBtn = document.querySelector(".close");
let catMenu = document.querySelector(".categories");
let dropMenu = document.querySelector(".drop-menu");
let hotProductsContainer = document.querySelector(".products");
let electronicsContainer = document.getElementById("swiper-electronics");
let appliancesContainer = document.getElementById("swiper-appliances");

console.log(electronicsContainer);

menuIcon.addEventListener("click", () => {
  sideMenu.style.left = "-46px";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-350px";
});

catMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("toggled");
});

// fetch products and display categories in home
async function getProducts() {
  let data = await fetch("../products.json");
  let products = await data.json();
  console.log(products);
  displayHotProducts(products);
  displayElectronics(products);
  displayAppliances(products);
}

getProducts();

function displayHotProducts(product) {
  let item = ``;
  for (let i = 0; i < product.length; i++) {
    if (product[i].old_price) {
      let discount = Math.floor((product[i].old_price - product[i].price) / product[i].old_price * 100)
      item += `
      <div class="swiper-slide product-card">
          <span class="sale">${discount}%</span>

          <div class="product-image">
            <img src="${product[i].img}" alt="" />
          </div>

          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>

          <h3 class="title">
            <a href="#">${product[i].name.split(" ").slice(0, 6).join(" ")}</a>
          </h3>

          <div class="price">
            <p class="new">$${product[i].price}</p>
            <p class="old">$${product[i].old_price}</p>
          </div>

          <div class="btns">
            <button class="add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
            <button class="wish">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
      </div>
      `;
    }
  }
  hotProductsContainer.innerHTML = item;
}

function displayElectronics(product) {
  let item = ``;
  for (let i = 0; i < product.length; i++) {
    if (product[i].catetory === "electronics") {
      
      item += `
      <div class="swiper-slide product-card">

          <div class="product-image">
            <img src="${product[i].img}" alt="" />
          </div>

          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>

          <h3 class="title">
            <a href="#">${product[i].name.split(" ").slice(0, 6).join(" ")}</a>
          </h3>

          <div class="price">
            <p class="new">$${product[i].price}</p>
          </div>

          <div class="btns">
            <button class="add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
            <button class="wish">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
      </div>
      `;
    }
  }
  electronicsContainer.innerHTML = item;
}

function displayAppliances(product) {
  let item = ``;
  for (let i = 0; i < product.length; i++) {
    if (product[i].catetory === "appliances") {
      
      item += `
      <div class="swiper-slide product-card">

          <div class="product-image">
            <img src="${product[i].img}" alt="" />
          </div>

          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>

          <h3 class="title">
            <a href="#">${product[i].name.split(" ").slice(0, 6).join(" ")}</a>
          </h3>

          <div class="price">
            <p class="new">$${product[i].price}</p>
          </div>

          <div class="btns">
            <button class="add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
            <button class="wish">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
      </div>
      `;
    }
  }
  appliancesContainer.innerHTML = item;
}