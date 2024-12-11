// Get the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('total');
    
    // Clear the cart container before adding updated items
    cartContainer.innerHTML = '';
    
    // Loop through the cart and display each item
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `<span>${item.name}</span> - ₹${item.price}`;
        cartContainer.appendChild(itemElement);
    });

    // Calculate total price
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });

    // Update the total display
    totalContainer.innerHTML = `Total: ₹${total}`;
}

// Call the displayCart function to update the page
displayCart();
