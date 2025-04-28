let cart = [];
let total;

if (window.localStorage.getItem("cartList")) {
  cart = JSON.parse(window.localStorage.getItem("cartList"));
}

let closeCart = document.getElementById("close-cart");
let cartCount = document.querySelector(".cart-list h3");
let topCartCount = document.querySelector(".cart-count");
let cartList = document.querySelector(".cart-list .list");
let cartTotal = document.querySelector(".cart-list .total");
let shopMoreCart = document.querySelector(".cart-list .btns .shop-more");
let cartBtn = document.getElementById("cart");
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
  let isExist = cart.some((item) => item.id === id);

  if (!isExist) {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartData();
  updateCartCounters();
  showCartItems();
  subTotal();
  updateCartButtons();
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
          <div class="content">
            <h4 class="title">${cart[i].name}</h4>
            <div class="controller">
              <div class="quantity">
                <button class="decrease" onclick="decreaseQuantity(${
                  cart[i].id
                })" ${cart[i].quantity === 1 ? "disabled" : ""}>-</button>
                <div class="quant">${cart[i].quantity}</div>
                <button class="increase" onclick="increaseQuantity(${
                  cart[i].id
                })">+</button>
              </div>
              <div class="price">$${cart[i].price * cart[i].quantity}</div>
            </div>
          </div>
          <button class="delete" onclick="removeFromCart(${cart[i].id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
    `;
  }

  cartList.innerHTML = cartItem;
  topCartCount.innerHTML = cart.length;
  cartCount.innerHTML = `Cart Items: ${cart.length}`;
}

showCartItems();
updateCartButtons();
subTotal();

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  showCartItems();
  saveCartData();
  updateCartCounters();
  subTotal();
  updateCartButtons();
}

function subTotal() {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  cartTotal.innerHTML = `$${total}`;
}

let increase = document.querySelector(".increase");
let decrease = document.querySelector(".decrease");
let quant = document.querySelector(".quant");
let itemPrice = document.querySelector(".item .price");

function increaseQuantity(id) {
  let cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.quantity += 1;
  }

  saveCartData();
  subTotal();
  showCartItems();
  calcItemsInCart();
}

function decreaseQuantity(id) {
  let cartItem = cart.find((item) => item.id === id);
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }
  saveCartData();
  subTotal();
  showCartItems();
  calcItemsInCart();
}

function calcItemsInCart() {
  let allItemsInCart = 0;
  for (let i = 0; i < cart.length; i++) {
    allItemsInCart += cart[i].quantity;
  }

  cartCount.innerHTML = `Cart Items: ${allItemsInCart}`;
}

calcItemsInCart();

function updateCartButtons() {
  let cartButtons = document.querySelectorAll(".add-to-cart");
  cartButtons.forEach((cartButton) => {
    let id = Number(cartButton.getAttribute("data-cart-id"));
    let isInCart = cart.some((item) => item.id === id);
    if (isInCart) {
      cartButton.classList.add("active");
      cartButton.innerHTML = "Item in cart";
    } else {
      cartButton.classList.remove("active");
      cartButton.innerHTML = "Add To Cart";
    }
  });
}
