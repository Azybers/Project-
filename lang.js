<script>

// Initialize the cart array to store items
let cart = [];

// Update the cart display when an item is added or removed
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    // Loop through the cart and display each item
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x ${item.quantity} - Php.${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    // Update the total price display
    totalPriceContainer.textContent = `Total: Php.${totalPrice.toFixed(2)}`;
}

// Add an item to the cart
function addToCart(event) {
    const productName = event.target.dataset.product;
    const productPrice = parseFloat(event.target.dataset.price);
    const quantity = parseInt(event.target.previousElementSibling.value);

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += quantity;
    } else {
        // If item doesn't exist, add it to the cart
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    updateCartDisplay();
    showPopup();
}

// Show the popup after adding an item to the cart
function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
}

// Close the popup
document.getElementById("close-popup").addEventListener("click", () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
});

// Event listener for the "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
});

// Hamburger menu toggle for mobile devices
document.getElementById("hamburger-menu").addEventListener("click", () => {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
});

// Prevent cart from being added multiple times when clicking quickly
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
        }, 500); // Disable button for 500ms after click
    });
});

// Event listener for the "Checkout" button (optional, can add more functionality later)
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Thank you for your purchase!");
        // Clear the cart after checkout (Optional)
        cart = [];
        updateCartDisplay();
    } else {
        alert("Your cart is empty!");
    }
});

// Optional: Auto-close the popup after 3 seconds
setTimeout(() => {
    const popup = document.getElementById("popup");
    if (popup.style.display === "flex") {
        popup.style.display = "none";
    }
}, 3000);
</script>

