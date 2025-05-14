document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Handle Login Form Submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username && password) {
                localStorage.setItem("currentUser", username);
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to index page
            } else {
                alert("Please enter a username and password.");
            }
        });
    }

    // 🔹 Cart Functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-item");
            const productName = productCard.querySelector("h3").innerText;
            const productPriceText = productCard.querySelector("p").innerText;
            const productImage = productCard.querySelector("img").src;

            const productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));

            const product = { name: productName, price: productPrice, image: productImage };

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
            alert(`${product.name} has been added to your cart!`);
        });
    });

    function updateCartUI() {
        const cartContainer = document.querySelector("#cart-items");
        const cartCount = document.getElementById("cart-count");
        const totalPriceElement = document.getElementById("total-price");
        if (cartCount) cartCount.innerText = cart.length;

        if (!cartContainer) return;
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <span>${item.name} - ₹${item.price}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
            totalPrice += item.price;
        });

        if (totalPriceElement) {
            totalPriceElement.innerText = `Total: ₹${totalPrice.toFixed(2)}`;
        }

        attachRemoveEvent();
    }

    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1); // ✅ Remove the item from cart
                localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Update local storage
                updateCartUI(); // ✅ Refresh UI
            });
        });
    }

    // Checkout form submission
    document.querySelector("#checkout-form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Order placed successfully!");
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
            } else {
                alert(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset();
            }
        });
    } else {
        console.log("Contact form not found! Check index.html");
    }
});
