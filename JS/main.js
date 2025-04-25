//handel header functions
let sideMenu = document.querySelector(".menu");
let menuIcon = document.querySelector(".menu-icon");
let closeBtn = document.querySelector(".close");
let catMenu = document.querySelector(".categories");
let dropMenu = document.querySelector(".drop-menu");
let hotProductsContainer = document.querySelector(".products");

// console.log(hotProductsContainer);

menuIcon.addEventListener("click", () => {
  sideMenu.style.left = "-46px";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-350px";
});

catMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("toggled");
});

// get products
async function getProducts() {
  let data = await fetch("../products.json");
  let products = await data.json();
  console.log(products);
  displayHomeProducts(products);
}

getProducts();

function displayHomeProducts(products) {
  let product = ``;
  for (let i = 0; i < products.length; i++) {
    product += `
          <div class="swiper-slide product-card">
              <span class="sale">50%</span>

              <div class="product-image">
                <img src="${products[i].img}" alt="" />
              </div>

              <div class="rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>

              <h3 class="title">
                <a href="#">${products[i].name
                  .split(" ")
                  .slice(0, 6)
                  .join(" ")}</a>
              </h3>

              <div class="price">
                <p class="new">$${products[i].price}</p>
                <p class="old">$${products[i].price * 2}</p>
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

  hotProductsContainer.innerHTML = product;
}
