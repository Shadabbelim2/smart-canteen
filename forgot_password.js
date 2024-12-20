document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forgot-password-form');
    const messageDiv = document.getElementById('response-message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        if (!email.endsWith('@acropolis.in')) {
            messageDiv.textContent = "Email must belong to the @acropolis.in domain.";
            return;
        }

        try {
            const response = await fetch('send_otp.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (result.success) {
                messageDiv.style.color = "green";
                messageDiv.textContent = result.message;
                setTimeout(() => {
                    window.location.href = 'verify_otp.html';
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
