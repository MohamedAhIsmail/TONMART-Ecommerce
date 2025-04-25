// Initialize Swiper slider
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

// Initialize Swiper products

var swiper = new Swiper(".product-slide", {
  // slidesPerView: 5,
  // spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
  breakpoints: {
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1000: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});
