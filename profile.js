function deactivateAccount() {
    // Ask why they want to deactivate
    const reason = prompt("Why do you want to deactivate your account?");
    
    // Ask for duration of deactivation
    const days = prompt("For how many days would you like to deactivate your account?");
    
    // Remove user from localStorage
    localStorage.removeItem('userName');
    
    // Clear the user-name display and show login button
    const userNameSpan = document.getElementById('user-name');
    const loginButton = document.getElementById('login-btn');
    
    if (userNameSpan) {
        userNameSpan.style.display = 'none';  // Hide user name
    }
    if (loginButton) {
        loginButton.style.display = 'inline';  // Show login button
    }
    
    // Redirect to login page after deactivation
    window.location.href = 'login.html';  // or wherever you want to redirect
}
