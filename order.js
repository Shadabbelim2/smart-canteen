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
        // Create a div for each cart item
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        // Add item details and a delete button
        itemElement.innerHTML = `
            <span>${item.name}</span> - ₹${item.price}
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        // Append the item to the cart container
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


