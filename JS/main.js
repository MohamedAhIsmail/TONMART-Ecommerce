async function getProducts() {
  let data = await fetch("../products.json");
  let products = await data.json();
  console.log(products);
}

getProducts();
