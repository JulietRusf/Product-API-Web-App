const apiURL = "https://www.course-api.com/javascript-store-products";

// Fetch using .then() and .catch()
function fetchProductsThen() {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.log("Fetch error:", error.message);
    });
}

// Fetch using async/await and try/catch
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

// Display first 5 products
function displayProducts(products) {
  const productContainer = document.querySelector("#product-container");
  productContainer.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const name = document.createElement("h2");
    name.textContent = product.fields.name;

    const image = document.createElement("img");
    image.src = product.fields.image[0].url;
    image.alt = product.fields.name;

    const price = document.createElement("p");
    price.textContent = `$${(product.fields.price / 100).toFixed(2)}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(price);

    productContainer.appendChild(card);
  });
}

// Reusable error handler
function handleError(error) {
  console.log(`An error occurred: ${error.message}`);
}

// Demonstrating both promise-based and async/await approaches

// Promise-based version (logs to console)
fetchProductsThen();

// Async/await version (displays products on page)
fetchProductsAsync();