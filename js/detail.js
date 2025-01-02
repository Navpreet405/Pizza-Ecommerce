document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("id", productId);

  // Check if product ID exists
  if (!productId) {
    console.error("No product ID found in URL.");
    return;
  }

  // Fetch the JSON data
  fetch("json/pizzas.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data:", data);
      // Find the product with the matching ID
      const product = data.find((item) => item.id === Number(productId));

      if (!product) {
        console.error("Product not found.");
        return;
      }

      // Populate the HTML with product details
      const imageElement = document.querySelector(".image img");
      const nameElement = document.querySelector(".content .name");
      const priceElement = document.querySelector(".content .price");
      const smallDescriptionElement = document.querySelector(
        ".content .small-description"
      );
      const longDescriptionElement = document.querySelector(
        ".content .long-description"
      );

      imageElement.src = product.image;
      imageElement.alt = product.name;
      nameElement.textContent = product.name;
      priceElement.textContent = `$${product.price}`;
      smallDescriptionElement.textContent = product.smallDescription;
      longDescriptionElement.textContent = product.bigDescription;
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("id", productId);

  // Check if product ID exists
  if (!productId) {
    console.error("No product ID found in URL.");
    return;
  }

  // Fetch the JSON data
  fetch("json/pizzas.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data:", data);
      // Find the product with the matching ID
      const product = data.find((item) => item.id === Number(productId));

      if (!product) {
        console.error("Product not found.");
        return;
      }

      // Populate the HTML with product details
      const imageElement = document.querySelector(".image img");
      const nameElement = document.querySelector(".content .name");
      const priceElement = document.querySelector(".content .price");
      const smallDescriptionElement = document.querySelector(
        ".content .small-description"
      );
      const longDescriptionElement = document.querySelector(
        ".content .long-description"
      );

      imageElement.src = product.image;
      imageElement.alt = product.name;
      nameElement.textContent = product.name;
      priceElement.textContent = `$${product.price}`;
      smallDescriptionElement.textContent = product.smallDescription;
      longDescriptionElement.textContent = product.bigDescription;

      // Render catalog items
      const catalogContainer = document.querySelector(".catalog-items");
      const otherProducts = data.filter((item) => item.id !== Number(productId)); // Exclude the current product

      otherProducts.forEach((item) => {
        // Create an anchor element for the clickable product
        const catalogItem = document.createElement("a");
        catalogItem.classList.add("catalog-item");

        // Set the link to the PDP page of the respective product
        catalogItem.href = `detail.html?id=${item.id}`; // Dynamic link to the PDP page

        // Add the inner HTML for the catalog item
        catalogItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-content">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
            <div class="item-description">${item.smallDescription}</div>
          </div>
        `;

        // Append the catalog item to the catalog container
        catalogContainer.appendChild(catalogItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Handle the Home button redirection
  const checkoutButton = document.querySelector(".checkout");
  checkoutButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to the homepage
  });
});





// Square Selector Logic
document.querySelectorAll('.square-selector').forEach((group) => {
  group.addEventListener('click', (event) => {
    if (event.target.classList.contains('square')) {
      group.querySelectorAll('.square').forEach((square) =>
        square.classList.remove('selected')
      );
      event.target.classList.add('selected');
    }
  });
});

const spiceSlider = document.getElementById('spice-slider');
const spiceLevels = ['Mild', 'Hot', 'Extra Hot'];

spiceSlider.addEventListener('input', () => {
  const level = parseInt(spiceSlider.value, 10);

  document.querySelector('.spice-label').textContent = `Spice Level: ${spiceLevels[level]}`;
});



