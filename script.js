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
