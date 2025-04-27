// wish list side menu
let closeWishBtn = document.getElementById("close-wish");
let wishListSide = document.querySelector(".wish-list");
let shopMore = document.querySelector(".shop-more");
let wishHeart = document.getElementById("wish");
let wishListContainer = document.querySelector(".list");
let wishedItemsCounter = document.querySelector(".wish-list .top h3");
let wishCounter = document.querySelector(".wish-count");
let wishList = [];

if (window.localStorage.getItem("wishList")) {
  wishList = JSON.parse(window.localStorage.getItem("wishList"));
}

function closeWishList() {
  wishListSide.style.setProperty("transform", "translateX(350px)");
}

function openWishList() {
  wishListSide.style.setProperty("transform", "translateX(0)");
}

wishHeart.addEventListener("click", openWishList);
closeWishBtn.addEventListener("click", closeWishList);
shopMore.addEventListener("click", closeWishList);

function saveWishListData() {
  window.localStorage.setItem("wishList", JSON.stringify(wishList));
}

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

//wish list
function addToWish(id) {
  let product = products.find((item) => item.id === id);

  let isExist = wishList.some((item) => item.id === id);

  if (!isExist) {
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
