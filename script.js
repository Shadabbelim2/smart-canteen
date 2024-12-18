function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
  }
  
  function redirectToLogin() {
    // Redirect to the login page
    window.location.href = 'login.html';
}

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('form');
//     console.log(form); // Yeh check karega ki form null hai ya properly mil raha hai

//     if (form) {
//         form.addEventListener('submit', function (event) {
//             const email = document.querySelector('input[name="email"]').value;
//             const password = document.querySelector('input[name="password"]').value;

//             if (!email || !password) {
//                 alert('Please fill in all fields');
//                 event.preventDefault(); // Prevent form submission
//             }
//         });
//     } else {
//         console.error("Form not found in DOM!");
//     }
// });



// $(document).ready(function () {
//     console.log("jQuery Loaded Successfully!");

//     // Check if the user is logged in already (you can implement later)
//     checkLoginStatus();

//     // Handle form submission
//     $('#login-form').submit(function (e) {
//         e.preventDefault();

//         const email = $('#login-email').val();
//         const password = $('#login-password').val();

//         // Send AJAX request to login.php
//         $.ajax({
//             url: 'login.php',
//             type: 'POST',
//             data: { email: email, password: password },
//             success: function (response) {
//                 try {
//                     const res = JSON.parse(response);

//                     if (res.status === 'success') {
//                         // On successful login
//                         $('#login-btn').hide();
//                         $('#user-name').text('Welcome, ' + res.name).show();
//                         $('#response-message').text('Login successful!').css('color', 'green');
//                     } else {
//                         $('#response-message').text(res.message).css('color', 'red');
//                     }
//                 } catch (error) {
//                     $('#response-message').text('Error: Invalid server response.');
//                     console.error('JSON Parse Error:', error);
//                 }
//             },
//             error: function () {
//                 $('#response-message').text('Something went wrong. Please try again.').css('color', 'red');
//             }
//         });
//     });
// });

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

