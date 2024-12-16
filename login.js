document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get input values
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Send login data to PHP backend
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json(); // Parse JSON response from PHP
        const messageDiv = document.getElementById('response-message');

        if (result.success) {
            // If login successful, redirect to index.html
            messageDiv.style.color = "green";
            messageDiv.textContent = result.message;
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to home page
            }, 1000); // Wait for 1 second to show the message
        } else {
            // Show error message for invalid credentials or no account
            messageDiv.style.color = "red";
            messageDiv.textContent = result.message;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
