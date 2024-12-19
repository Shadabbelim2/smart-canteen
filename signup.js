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

        // Log raw response for debugging
        const textResponse = await response.text(); // Get raw response text
        console.log("Raw Response:", textResponse); // Debugging line

        let result;
        try {
            result = JSON.parse(textResponse); // Try to parse it as JSON
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert('Server returned an invalid response.');
            return;
        }

        const messageDiv = document.getElementById('response-message');
        if (result.success) {
            messageDiv.style.color = "green";
            messageDiv.textContent = result.message;
            alert(result.message); // OTP sent message
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('otp-form').style.display = 'block';
        } else {
            messageDiv.style.color = "red";
            messageDiv.textContent = result.message;
            alert(result.message);
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

// OTP Verification
document.getElementById('otp-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const otp = document.getElementById('otp').value;
    const formData = new FormData();
    formData.append('otp', otp);

    try {
        const response = await fetch('otp_verify.php', {
            method: 'POST',
            body: formData,
        });

        // Log raw response for debugging
        const textResponse = await response.text(); // Get raw response text
        console.log("Raw Response from OTP verification:", textResponse); // Debugging line

        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert('Server returned an invalid response.');
            return;
        }

        if (result.success) {
            alert(result.message); // Registration successful
            window.location.href = 'login.html'; // Redirect to homepage
        } else {
            alert(result.message); // OTP invalid
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
