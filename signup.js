document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Default form submission ko prevent karein

    const loader = document.getElementById('loader');
    const responseMessage = document.getElementById('response-message');

    // Loader show karo
    loader.style.display = 'block';
    responseMessage.textContent = ''; // Clear any previous messages

    const formData = new FormData(this);

    // AJAX request to send form data to PHP
    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Loader ko hide karo
            loader.style.display = 'none';

            // Response ko show karo
            if (data.success) {
                responseMessage.style.color = 'green';
                responseMessage.textContent = data.message;

                // OTP Form ko display karne ka code
                document.getElementById('signup-form').style.display = 'none';
                document.getElementById('otp-form').style.display = 'block';
            } else {
                responseMessage.style.color = 'red';
                responseMessage.textContent = data.message;
            }
        })
        .catch(error => {
            // Loader ko hide karo
            loader.style.display = 'none';

            // Error message dikhana
            responseMessage.style.color = 'red';
            responseMessage.textContent = 'An error occurred. Please try again.';
        });
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
