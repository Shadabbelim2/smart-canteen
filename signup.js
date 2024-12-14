 // JavaScript for handling form submission
 document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    
    const formData = new FormData(this); // Get form data

    try {
        const response = await fetch('signup.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json(); // Parse JSON response
        
        const messageDiv = document.getElementById('response-message');
        
        // Show error or success message in the div
        if (result.success) {
            messageDiv.style.color = "green";
            messageDiv.textContent = result.message;
        } else {
            messageDiv.style.color = "red";
            messageDiv.textContent = result.message;
        }

        // If user already exists, redirect to login page
        // if (result.redirect) {
        //     window.location.href = 'login.html';
        // }
    } catch (error) {
        console.error("Error:", error);
    }
});