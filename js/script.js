let navbar = document.querySelector(".header .flex .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

let account = document.querySelector(".user-account");

document.querySelector("#user-btn").onclick = () => {
  account.classList.add("active");
};

document.querySelector("#close-account").onclick = () => {
  account.classList.remove("active");
};

let cart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  cart.classList.add("active");
};

document.querySelector("#close-cart").onclick = () => {
  cart.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  cart.classList.remove("active");
};

let slides = document.querySelectorAll(
  ".home-bg .home .slide-container .slide"
);
let index = 0;

function next() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

function prev() {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
}

let accordion = document.querySelectorAll(
  ".faq .accordion-container .accordion"
);

accordion.forEach((acco) => {
  acco.onclick = () => {
    accordion.forEach((remove) => remove.classList.remove("active"));
    acco.classList.add("active");
  };
});

document.addEventListener("DOMContentLoaded", () => {
  // Get the shopping cart container
  const shoppingCart = document.querySelector(".shopping-cart section");

  // Get the shopping cart count element in the header
  const cartCountElement = document.querySelector("#cart-btn span");

  // Function to update the cart count and store it in localStorage
  function updateCartCount() {
    const totalItems = Array.from(shoppingCart.querySelectorAll(".box")).reduce(
      (count, cartItem) =>
        count + parseInt(cartItem.querySelector(".qty").value),
      0
    );

    // Store the total items count in localStorage
    localStorage.setItem("cartCount", totalItems);

    // Update the cart count element in the header
    cartCountElement.textContent = `(${totalItems})`;
  }

  // Function to update cart items in localStorage
  function updateCartItemsInStorage() {
    const cartItems = Array.from(shoppingCart.querySelectorAll(".box")).map(
      (cartItem) => {
        const itemName = cartItem.querySelector(".content p").textContent;
        const itemPrice = cartItem.querySelector(".content span").textContent;
        const itemQty = parseInt(cartItem.querySelector(".qty").value);
        const itemImage = cartItem.querySelector("img").src;
        return { itemName, itemPrice, itemQty, itemImage };
      }
    );

    // Store the cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function updateTotalPrice() {
    const totalPrice = Array.from(shoppingCart.querySelectorAll(".box")).reduce(
      (total, cartItem) => {
        const qty = parseInt(cartItem.querySelector(".qty").value);
        const pricePerItem = parseFloat(
          cartItem
            .querySelector(".content span")
            .textContent.match(/\$\d+/)[0]
            .substring(1)
        );
        return total + qty * pricePerItem;
      },
      0
    );
    document.querySelector(
      ".total-price"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Function to load the cart items from localStorage
  function loadCartItems() {
    const storedItems = JSON.parse(localStorage.getItem("cartItems"));

    if (storedItems && storedItems.length > 0) {
      storedItems.forEach((item) => {
        const newItem = document.createElement("div");
        newItem.classList.add("box");
        newItem.innerHTML = `
             <a href="#" class="fas fa-times"></a>
             <img src="${item.itemImage}" alt="" />
             <div class="content">
               <p>${item.itemName}</p>
               <span style="font-size: larger;">( $${item.itemPrice}/- x ${
          item.itemQty
        } = $${(item.itemPrice * item.itemQty).toFixed(2)} )</span>
               <form action="" method="post">
                 <input
                   type="number"
                   class="qty"
                   name="qty"
                   min="1"
                   value="${item.itemQty}"
                   max="100"
                 />
               </form>
             </div>
             `;
        shoppingCart.insertBefore(newItem, shoppingCart.querySelector(".btn"));

        // Attach the close button listener to the new item
        attachCloseButtonListener(newItem.querySelector(".fas.fa-times"));
      });
    }
    updateTotalPrice();
  }

  // Function to load the cart count from localStorage
  function loadCartCount() {
    const storedCount = localStorage.getItem("cartCount");
    if (storedCount) {
      cartCountElement.textContent = `(${storedCount})`;
    } else {
      cartCountElement.textContent = "(0)"; // Default to 0 if no count exists
    }
  }

  // Call loadCartCount and loadCartItems to update the cart when the page loads
  loadCartCount();
  loadCartItems();

  // Add event listener to menu "add to cart" buttons
  document.querySelectorAll("#menu .btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission

      const box = event.target.closest(".box"); // Find the product container
      const itemName = box.querySelector(".name").textContent; // Get item name
      const itemPrice = box.querySelector(".price span").textContent; // Get item price
      const itemImage = box.querySelector("img").src; // Get item image
      const itemQty = parseInt(box.querySelector(".qty").value); // Get item quantity

      // Check if the item already exists in the cart
      const existingItem = Array.from(
        shoppingCart.querySelectorAll(".box")
      ).find((cartItem) =>
        cartItem.querySelector(".content p").textContent.includes(itemName)
      );

      if (existingItem) {
        // Update the quantity of the existing item
        const qtyInput = existingItem.querySelector(".qty");
        qtyInput.value = parseInt(qtyInput.value) + itemQty;
        const qtySpan = existingItem.querySelector(".content span");
        qtySpan.textContent = `( $${itemPrice}/- x ${qtyInput.value} )`;
      } else {
        // Create a new cart item
        const newItem = document.createElement("div");
        newItem.classList.add("box");
        newItem.innerHTML = `
               <a href="#" class="fas fa-times"></a>
               <img src="${itemImage}" alt="" />
               <div class="content">
                 <p>${itemName}</p>
                 <span style="font-size: larger;">( $${item.itemPrice}/- x ${
          item.itemQty
        } = $${(item.itemPrice * item.itemQty).toFixed(2)} )</span>
                 <form action="" method="post">
                   <input
                     type="number"
                     class="qty"
                     name="qty"
                     min="1"
                     value="${itemQty}"
                     max="100"
                   />
                 </form>
               </div>
             `;
        shoppingCart.insertBefore(newItem, shoppingCart.querySelector(".btn"));

        // Attach the close button listener to the new item
        attachCloseButtonListener(newItem.querySelector(".fas.fa-times"));
      }

      // Update the cart count and store it in localStorage
      updateCartCount();

      // Update the cart items in localStorage
      updateCartItemsInStorage();
    });
  });

  // Function to handle close button clicks
  function attachCloseButtonListener(closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      const cartItem = event.target.closest(".box"); // Find the cart item container
      cartItem.remove(); // Remove the cart item from the DOM

      // Update the cart count and store it in localStorage
      updateCartCount();

      // Update the cart items in localStorage
      updateCartItemsInStorage();
      updateTotalPrice();
    });
  }

  // Attach listeners to existing close buttons in the cart
  document
    .querySelectorAll(".shopping-cart .fas.fa-times")
    .forEach(attachCloseButtonListener);

  // Initial update of the cart count
  updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".order form");
  const modal = document.getElementById("order-modal");
  const closeModal = document.getElementById("close-modal");
  const closeButton = document.getElementById("close-popup");

  // Show the popup when the form is submitted
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission to demonstrate popup

    // Show the modal
    modal.style.display = "block";

    // Reset the form values after the popup is shown
    form.reset();
  });

  // Close the modal when the user clicks on the "close" button (X)
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when the user clicks the "Close" button
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal if the user clicks outside of the modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Fetch JSON data //
document.addEventListener("DOMContentLoaded", function () {
  fetch("json/pizzas.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data", data);
      const container = document.getElementById("dynamic-content");

      data.forEach((item) => {
        // Create a div element for each pizza
        const box = document.createElement("div");
        box.classList.add("box");

        // Insert HTML for the pizza
        box.innerHTML = `
            <div class="price">$<span>${item.price}</span>/-</div>
            <img style="cursor: pointer;" src="${item.image}" alt="${item.name}" data-id="${item.id}" class="pizza-image" />
            <div class="name">${item.name}</div>
            <p style="font-size: small;">${item.smallDescription}</p>
            <form action="" method="post">
              <input
                 type="number"
                 min="1"
                 max="100"
                 value="1"
                 class="qty"
                 name="qty"
              />
              <button
                 type="button"
                 class="btn add-to-cart"
              >Add to Cart</button>
            </form>
          `;

        // Append the box to the container
        container.appendChild(box);
      });

      // Handle clicks on the images to redirect to detail.html
      container.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("pizza-image")) {
          const pizzaId = event.target.getAttribute("data-id");
          window.location.href = `detail.html?id=${pizzaId}`;
        }
      });

      // Attach event listeners to dynamically added buttons
      container.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("add-to-cart")) {
          const box = event.target.closest(".box");
          const itemName = box.querySelector(".name").textContent;
          const itemPrice = box.querySelector(".price span").textContent;
          const itemImage = box.querySelector("img").src;
          const itemQty = parseInt(box.querySelector(".qty").value);

          // Call the add-to-cart function
          handleAddToCart(itemName, itemPrice, itemImage, itemQty);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });

  const shoppingCart = document.querySelector(".shopping-cart section");

  function handleAddToCart(itemName, itemPrice, itemImage, itemQty) {
    const existingItem = Array.from(shoppingCart.querySelectorAll(".box")).find(
      (cartItem) =>
        cartItem.querySelector(".content p").textContent.includes(itemName)
    );

    if (existingItem) {
      const qtyInput = existingItem.querySelector(".qty");
      qtyInput.value = parseInt(qtyInput.value) + itemQty;
      const totalItemPrice = parseFloat(itemPrice) * parseInt(qtyInput.value); // Calculate total for the item
      const qtySpan = existingItem.querySelector(".content span");
      qtySpan.textContent = `( $${itemPrice}/- x ${
        qtyInput.value
      } = $${totalItemPrice.toFixed(2)} )`;
    } else {
      const totalItemPrice = parseFloat(itemPrice) * itemQty; // Calculate total for the new item
      const newItem = document.createElement("div");
      newItem.classList.add("box");
      newItem.innerHTML = `
          <a href="#" class="fas fa-times"></a>
          <img src="${itemImage}" alt="" />
          <div class="content">
            <p>${itemName}</p>
            <span>( $${itemPrice}/- x ${itemQty} = $${totalItemPrice.toFixed(
        2
      )} )</span>
            <form action="" method="post">
              <input type="number" class="qty" name="qty" min="1" value="${itemQty}" max="100" />
            </form>
          </div>
        `;
      shoppingCart.insertBefore(newItem, shoppingCart.querySelector(".btn"));

      attachCloseButtonListener(newItem.querySelector(".fas.fa-times"));
    }

    updateCartCount();
    updateTotalPrice(); // Update total price
    updateCartItemsInStorage();
  }

  function updateTotalPrice() {
    const totalPrice = Array.from(shoppingCart.querySelectorAll(".box")).reduce(
      (total, cartItem) => {
        const qty = parseInt(cartItem.querySelector(".qty").value);
        const pricePerItem = parseFloat(
          cartItem
            .querySelector(".content span")
            .textContent.match(/\$\d+/)[0]
            .substring(1)
        );
        return total + qty * pricePerItem;
      },
      0
    );
    document.querySelector(
      ".total-price"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Modify updateCartItemsInStorage to save prices without formatting
  function updateCartItemsInStorage() {
    const cartItems = Array.from(shoppingCart.querySelectorAll(".box")).map(
      (cartItem) => {
        const itemName = cartItem.querySelector(".content p").textContent;
        console.log(itemName);
        const itemPrice = parseFloat(
          cartItem
            .querySelector(".content span")
            .textContent.match(/\$\d+/)[0]
            .substring(1)
        );
        const itemQty = parseInt(cartItem.querySelector(".qty").value);
        const itemImage = cartItem.querySelector("img").src;
        return { itemName, itemPrice, itemQty, itemImage };
      }
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function updateCartCount() {
    const totalItems = Array.from(shoppingCart.querySelectorAll(".box")).reduce(
      (count, cartItem) =>
        count + parseInt(cartItem.querySelector(".qty").value),
      0
    );
    document.querySelector("#cart-btn span").textContent = `(${totalItems})`;
  }

  shoppingCart.addEventListener("input", (event) => {
    const target = event.target;

    // Check if the event is triggered on a quantity input field
    if (target.classList.contains("qty")) {
      const cartItem = target.closest(".box"); // Parent element of the quantity field
      const itemPriceElement = cartItem.querySelector(".content span");
      const itemPrice = parseFloat(
        itemPriceElement.textContent.match(/\$\d+/)[0].substring(1)
      );
      const itemQty = parseInt(target.value);

      // Update the price for this item
      const totalItemPrice = itemPrice * itemQty;
      const priceDisplay = cartItem.querySelector(".content span"); // Adjust selector if needed
      priceDisplay.innerHTML = `($${itemPrice}/- x ${itemQty} = $${totalItemPrice.toFixed(
        2
      )})`;

      // Update the total price at the bottom
      updateTotalPrice2();

      // Update localStorage
      updateCartItemsInStorage2();
    }
  });

  // Recalculate and display the total price
  function updateTotalPrice2() {
    const cartItems = Array.from(shoppingCart.querySelectorAll(".box"));
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      const itemPriceText = cartItem.querySelector(".content span").textContent;
      const match = itemPriceText.match(/\=\s*\$(\d+(\.\d+)?)/); // Extract total price from text
      if (match) {
        totalPrice += parseFloat(match[1]);
      }
    });

    // Update the total price display
    document.querySelector(
      ".total-price"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Update cart items in localStorage
  function updateCartItemsInStorage2() {
    const cartItems = Array.from(shoppingCart.querySelectorAll(".box")).map(
      (cartItem) => {
        const itemName = cartItem
          .querySelector(".content span")
          .textContent.trim();
        const itemPrice = parseFloat(
          cartItem
            .querySelector(".content span")
            .textContent.match(/\$\d+/)[0]
            .substring(1)
        );
        const itemQty = parseInt(cartItem.querySelector(".qty").value);
        const itemImage = cartItem.querySelector("img").src;

        return { itemName, itemPrice, itemQty, itemImage };
      }
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function attachCloseButtonListener(closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      const cartItem = event.target.closest(".box");
      cartItem.remove();
      updateCartCount();
      updateCartItemsInStorage();
      updateTotalPrice();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Select the register and login forms
  const registerForm = document.querySelector('form[name="register"]');
  const loginForm = document.querySelector('form[name="login"]');

  // Select the user account section
  const userAccountSection = document.querySelector(".user-account");

  // Function to render the user card
  const renderUserCard = (user) => {
    // Update the welcome message
    document.querySelector(
      ".user p span"
    ).textContent = `Welcome, ${user.name}!`;

    // Remove any existing user data card
    const existingCard = document.querySelector(".user-card");
    if (existingCard) existingCard.remove();

    // Create a new card for the user
    const userCard = document.createElement("div");
    userCard.className = "user-card";

    // Add user name
    const userName = document.createElement("p");
    userName.textContent = `Name: ${user.name}`;
    userCard.appendChild(userName);

    // Add user email
    const userEmail = document.createElement("p");
    userEmail.textContent = `Email: ${user.email}`;
    userCard.appendChild(userEmail);

    // Add logout button
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.className = "logout-btn";
    logoutButton.style.marginTop = "10px";
    logoutButton.style.padding = "5px 10px";
    logoutButton.style.backgroundColor = "#ff4d4d";
    logoutButton.style.color = "#fff";
    logoutButton.style.border = "none";
    logoutButton.style.borderRadius = "3px";
    logoutButton.style.cursor = "pointer";

    // Logout button functionality
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser"); // Remove logged-in user
      document.querySelector(".user p span").textContent =
        "You are not logged in now!";
      userCard.remove(); // Remove the user card
    });

    userCard.appendChild(logoutButton);

    // Add styling to the card
    userCard.style.border = "1px solid #ddd";
    userCard.style.padding = "15px";
    userCard.style.margin = "10px 0";
    userCard.style.borderRadius = "5px";
    userCard.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    userCard.style.backgroundColor = "#fff";

    // Append the card to the flex container
    const flexContainer = document.querySelector(".user-account .flex");
    flexContainer.appendChild(userCard);
  };

  // Check for a logged-in user on page load
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    renderUserCard(loggedInUser);
  }

  // Handle user registration
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get user data from the form
    const name = registerForm.querySelector('input[name="name"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="pass"]').value;
    const confirmPassword = registerForm.querySelector(
      'input[name="cpass"]'
    ).value;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("User already exists!");
      return;
    }

    // Store the user details in localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    registerForm.reset();
  });

  // Handle user login
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the login credentials from the form
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="pass"]').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with matching credentials
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save logged-in user to localStorage
      renderUserCard(user);
      loginForm.reset();
    } else {
      alert("User does not exist or incorrect password!");
    }
  });
});
