function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
  }
  
  function redirectToLogin() {
    // Redirect to the login page
    window.location.href = 'login.html';
}

document.querySelector('form').addEventListener('submit', function(event) {
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Perform basic client-side validation
  if (!email || !password) {
      alert('Please fill in all fields');
      event.preventDefault(); // Prevent form submission
  }
});


$(document).ready(function () {
    // Check if the user is logged in already
    checkLoginStatus();

    // Handle form submission
    $('#login-form').submit(function (e) {
        e.preventDefault();

        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Send AJAX request to login.php
        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: { email: email, password: password },
            success: function (response) {
                const res = JSON.parse(response);

                if (res.status === 'success') {
                    // On successful login, replace login button with user name
                    $('#login-btn').hide();
                    $('#user-name').text('Welcome, ' + res.name).show();
                } else {
                    $('#response-message').text(res.message); // Show error message
                }
            },
            error: function () {
                $('#response-message').text('Something went wrong. Please try again.');
            }
        });
    });
});

// Function to check login status
function checkLoginStatus() {
    $.ajax({
        url: 'check_session.php',
        type: 'GET',
        success: function(response) {
            const res = JSON.parse(response);
            if (res.status === 'success') {
                $('#login-btn').hide();
                $('#user-name').text('Welcome, ' + res.name).show();
            }
        }
    });
}


function saveOrder(items, total) {
    // Create a new order object
    const newOrder = {
        orderToken: `#${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random token
        orderTime: new Date().toLocaleString(), // Current date and time
        items: items, // Array of items
        total: total // Total amount
    };

    // Fetch existing orders from localStorage or initialize as an empty array
    const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

    // Add the new order to the array
    allOrders.push(newOrder);

    // Save the updated orders back to localStorage
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    // Save the last order separately
    localStorage.setItem('lastOrder', JSON.stringify(newOrder));

    // Redirect to the receipt page
    window.location.href = 'receipt.html';
}
