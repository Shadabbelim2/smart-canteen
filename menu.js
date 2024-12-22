// Cart array to hold the items
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

// Add event listener to the "Add to Order" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Get the name and price from the button's data attributes
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'), 10); // Convert price to integer
        
        // Add the item to the cart
        addToCart(name, price);

        // Display a message
        showMessage(`Product "${name}" added to your order list.`);
    });
});

// Function to add items to the cart
function addToCart(name, price) {
    // Add item to the cart array
    cart.push({ name, price });
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
    // Function to display a message
function showMessage(message) {
    // Create a message div
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '50%';
    messageDiv.style.right = '50%';
    messageDiv.style.transform = 'translate(50%, 50%)';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.backgroundColor = '#4caf50'; // Green background
    messageDiv.style.color = 'white';
    messageDiv.style.fontSize = '16px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.transition = 'opacity 0.5s ease';

    // Add the message div to the body
    document.body.appendChild(messageDiv);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 500); // Wait for the opacity transition
    }, 3000);
}