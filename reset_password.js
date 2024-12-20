document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reset-password-form');
    const messageDiv = document.getElementById('response-message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            messageDiv.textContent = "Passwords do not match.";
            return;
        }

        try {
            const response = await fetch('reset_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();
            if (result.success) {
                messageDiv.style.color = "green";
                messageDiv.textContent = result.message;
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                messageDiv.textContent = result.message;
            }
        } catch (error) {
            console.error("Error:", error);
            messageDiv.textContent = "An error occurred. Please try again.";
        }
    });
});


// Toggle visibility for New Password
document.getElementById('toggle-password-1').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon-1');

    // Toggle between text and password
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.textContent = '🙈'; // Change icon to closed eye
    } else {
        passwordField.type = 'password';
        eyeIcon.textContent = '👁️'; // Change icon to open eye
    }
});

// Toggle visibility for Confirm Password
document.getElementById('toggle-password-2').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('confirm-password');
    const eyeIcon = document.getElementById('eye-icon-2');

    // Toggle between text and password
    if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        eyeIcon.textContent = '🙈'; // Change icon to closed eye
    } else {
        confirmPasswordField.type = 'password';
        eyeIcon.textContent = '👁️'; // Change icon to open eye
    }
});
