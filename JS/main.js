//handel header functions
let sideMenu = document.querySelector(".menu");
let menuIcon = document.querySelector(".menu-icon");
let closeBtn = document.querySelector(".close");
let catMenu = document.querySelector(".categories");
let dropMenu = document.querySelector(".drop-menu");
let hotProductsContainer = document.querySelector(".products");
let electronicsContainer = document.getElementById("swiper-electronics");
let appliancesContainer = document.getElementById("swiper-appliances");
let mobilesContainer = document.getElementById("swiper-mobiles");

let products = [];


// fetch products and display categories in home
async function getProducts() {
  try {
    let response = await fetch("../products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    products = await response.json();

    displayHotProducts(products);
    displayCategoryProducts(products, electronicsContainer, "electronics");
    displayCategoryProducts(products, appliancesContainer, "appliances");
    displayCategoryProducts(products, mobilesContainer, "mobiles");
    updateCartButtons();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

getProducts();

function displayHotProducts(product) {
  let item = ``;
  for (let i = 0; i < product.length; i++) {
    if (product[i].old_price) {
      let discount = Math.floor(
        ((product[i].old_price - product[i].price) / product[i].old_price) * 100
      );
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
            <a href="#">${product[i].name}</a>
          </h3>

          <div class="price">
            <p class="new">$${product[i].price}</p>
            <p class="old">$${product[i].old_price}</p>
          </div>

          <div class="btns">
            <button class="add-to-cart" data-cart-id="${
              product[i].id
            }" onclick="addToCart(${product[i].id})">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
              <button class="${
                wishList.some((item) => item.id === product[i].id)
                  ? "selected"
                  : "wish"
              }" data-id="${product[i].id}" onclick="addToWish(${
        product[i].id
      })">

              <i class="fa-regular fa-heart"></i>
            </button>

          </div>
      </div>
      `;
    }
  }
  hotProductsContainer.innerHTML = item;
}

function displayCategoryProducts(product, container, category) {
  let item = ``;
  for (let i = 0; i < product.length; i++) {
    if (product[i].category === category) {
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
            <a href="#">${product[i].name}</a>
          </h3>

          <div class="price">
            <p class="new">$${product[i].price}</p>
          </div>

          <div class="btns">
            <button class="add-to-cart" data-cart-id="${
              product[i].id
            }" onclick="addToCart(${product[i].id})">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
            <button class="${
              wishList.some((item) => item.id === product[i].id)
                ? "selected"
                : "wish"
            }" data-id="${product[i].id}" onclick="addToWish(${product[i].id})">

              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
      </div>
      `;
    }
  }
  container.innerHTML = item;
}

// clicable Menus Functions
menuIcon.addEventListener("click", () => {
  sideMenu.style.left = "-46px";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-350px";
});

catMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("toggled");
});

// To Top button feature
let toTopBtn = document.querySelector(".to-top");

window.onscroll = function () {
  if (window.scrollY > 600) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
};

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
