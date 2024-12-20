document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('otp-form');
    const messageDiv = document.getElementById('response-message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const otp = document.getElementById('otp').value;

        try {
            const response = await fetch('verify_otp.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });

            const result = await response.json();
            if (result.success) {
                messageDiv.style.color = "green";
                messageDiv.textContent = result.message;
                setTimeout(() => {
                    window.location.href = 'reset_password.html';
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
