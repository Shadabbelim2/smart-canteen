// Get the cart from localStorage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart with delete buttons
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('total');

    // Clear the cart container before adding updated items
    cartContainer.innerHTML = '';

    // Loop through the cart and display each item with a delete button
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <span>${item.name}</span> - ₹${item.price}
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        cartContainer.appendChild(itemElement);
    });

    // Calculate the total price
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Update the total display
    totalContainer.innerHTML = `Total: ₹${total}`;

    // Add event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index; // Get the index of the item
            deleteCartItem(index); // Call the delete function
        });
    });
}

// Function to delete an item from the cart
function deleteCartItem(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh the cart display
}

// Call the displayCart function initially to show the items
displayCart();

/// Select the order button
const orderButton = document.getElementById('order-btn');

// Add click event listener to the button
orderButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to place an order.");
        return;
    }

    // Generate a unique token (Order ID)
    const orderToken = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    // Get the current time
    const orderTime = new Date().toLocaleString();

    // Prepare the order details
    const orderDetails = {
        orderToken: orderToken,
        orderTime: orderTime,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price, 0)
    };

    // Retrieve all past orders from localStorage
    let allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

    // Add the new order to the list
    allOrders.push(orderDetails);

    // Store the updated order list back to localStorage
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    // Redirect to success page
    window.location.href = 'success.html';
});
