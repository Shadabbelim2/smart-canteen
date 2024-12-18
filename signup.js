document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Email validation for @acropolis.in domain
    if (!email.endsWith('@acropolis.in')) {
        alert('Email must belong to the acropolis.in domain.');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Send form data to backend
    const formData = new FormData(this);

    try {
        const response = await fetch('signup.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json(); // Parse JSON response
        const messageDiv = document.getElementById('response-message');

        if (result.success) {
            messageDiv.style.color = "green";
            messageDiv.textContent = result.message;
        } else {
            messageDiv.style.color = "red";
            messageDiv.textContent = result.message;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggle-confirm-password').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('confirm-password');
    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
