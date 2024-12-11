// Cart array to hold the items
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from localStorage

// Add event listener to the "Add to Order" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Get the name and price from the button's data attributes
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'), 10); // Convert price to integer
        
        // Add the item to the cart
        addToCart(name, price);
    });
});

// Function to add items to the cart
function addToCart(name, price) {
    // Add item to the cart array
    cart.push({ name, price });
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
