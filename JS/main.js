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
let wishCounter = document.querySelector(".wish-count");

let products = [];
let wishList = [];
let cart = [];

if (window.localStorage.getItem("wishList")) {
  wishList = JSON.parse(window.localStorage.getItem("wishList"));
}

if (window.localStorage.getItem("cartList")) {
  cart = JSON.parse(window.localStorage.getItem("cartList"));
}

// fetch products and display categories in home
async function getProducts() {
  try {
    let response = await fetch("../products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    products = await response.json();
    console.log(products);

    displayHotProducts(products);
    displayCategoryProducts(products, electronicsContainer, "electronics");
    displayCategoryProducts(products, appliancesContainer, "appliances");
    displayCategoryProducts(products, mobilesContainer, "mobiles");
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
            <button class="add-to-cart" onclick="addToCart(${product[i].id})">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
              <button class="${
                wishList.some((item) => item.id === product[i].id)
                  ? "selected"
                  : "wish"
              }" onclick="addToWish(${product[i].id})">

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
            <button class="add-to-cart" onclick="addToCart(${product[i].id})">
              <i class="fa-solid fa-cart-shopping"></i>Add To Cart
            </button>
            <button class="${
              wishList.some((item) => item.id === product[i].id)
                ? "selected"
                : "wish"
            }" onclick="addToWish(${product[i].id})">

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

//wish list
function addToWish(id) {
  let product = products.find((item) => item.id === id);

  if (!wishList.includes(product)) {
    wishList.push(product);

    saveWishListData();
    displayHotProducts(products);
    displayCategoryProducts(products, electronicsContainer, "electronics");
    displayCategoryProducts(products, appliancesContainer, "appliances");
    displayCategoryProducts(products, mobilesContainer, "mobiles");

    showWishListItems();
    updateWishCounter();
  }
}

function saveWishListData() {
  window.localStorage.setItem("wishList", JSON.stringify(wishList));
}

// wish list side menu
let closeWishBtn = document.getElementById("close-wish");
let wishListSide = document.querySelector(".wish-list");
let shopMore = document.querySelector(".shop-more");
let wishHeart = document.getElementById("wish");
let wishListContainer = document.querySelector(".list");
let wishedItemsCounter = document.querySelector(".wish-list .top h3");

function closeWishList() {
  wishListSide.style.setProperty("transform", "translateX(350px)");
}

function openWishList() {
  wishListSide.style.setProperty("transform", "translateX(0)");
}

wishHeart.addEventListener("click", openWishList);
closeWishBtn.addEventListener("click", closeWishList);
shopMore.addEventListener("click", closeWishList);

function showWishListItems() {
  let wishItem = ``;

  for (let i = 0; i < wishList.length; i++) {
    wishItem += `
        <div class="item">
          <img src="${wishList[i].img}" alt="${wishList[i].name}" />
          <div>
            <h4 class="title">
            ${wishList[i].name}
            </h4>
            <div class="price">$${wishList[i].price}</div>
          </div>
          <button class="delete" onclick="removeFromWish(${wishList[i].id})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
  }

  wishListContainer.innerHTML = wishItem;
  wishCounter.innerHTML = wishList.length;
  wishedItemsCounter.innerHTML = `Your Wish List Items: ${wishList.length}`;
}

showWishListItems();

function removeFromWish(id) {
  wishList = wishList.filter((product) => product.id != id);
  showWishListItems();
  updateWishCounter();
  saveWishListData();
}

function updateWishCounter() {
  wishCounter.innerHTML = wishList.length;
  wishedItemsCounter.innerHTML = `Your Wish List Items: ${wishList.length}`;
}

// The Cart
let closeCart = document.getElementById("close-cart");
let cartCount = document.querySelector(".cart-list h3");
let cartList = document.querySelector(".cart-list .list");
let cartTotal = document.querySelector(".cart-list .total");
let shopMoreCart = document.querySelector(".cart-list .btns .shop-more");
let cartBtn = document.getElementById("cart");
let topCartCount = document.querySelector(".cart-count");
let cartListSide = document.querySelector(".cart-list");

function closeCartSide() {
  cartListSide.style.setProperty("transform", "translateX(350px)");
}

function openCart() {
  cartListSide.style.setProperty("transform", "translateX(0)");
}

closeCart.addEventListener("click", closeCartSide);
cartBtn.addEventListener("click", openCart);
shopMoreCart.addEventListener("click", closeCartSide);

// Cart Functions

function addToCart(id) {
  let product = products.find((item) => item.id == id);

  if (!cart.includes(product)) {
    cart.push(product);
    console.log(cart);
  }
  saveCartData();
  updateCartCounters();
  showCartItems();
}

function saveCartData() {
  window.localStorage.setItem("cartList", JSON.stringify(cart));
}

function updateCartCounters() {
  cartCount.innerHTML = `Cart Items: ${cart.length}`;
  topCartCount.innerHTML = cart.length;
}

function showCartItems() {
  let cartItem = ``;

  for (let i = 0; i < cart.length; i++) {
    cartItem += `
        <div class="item">
          <img src="${cart[i].img}" alt="${cart[i].name}" />
          <div>
            <h4 class="title">
            ${cart[i].name}
            </h4>
            <div class="price">$${cart[i].price}</div>
          </div>
          <button class="delete" onclick="removeFromCart(${cart[i].id})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
  }

  cartList.innerHTML = cartItem;
  topCartCount.innerHTML = cart.length;
  cartCount.innerHTML = `Cart Items: ${cart.length}`;
}

showCartItems();

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  console.log(cart);
  showCartItems();
  saveCartData();
  updateCartCounters();
}
