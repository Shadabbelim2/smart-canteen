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
