function logout() {
    // Logout function in JavaScript
    fetch('logout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Logout successful!');
            // Clear user data from UI
            document.getElementById('orders').innerHTML = ''; // Orders list ko empty kar do
            // Redirect user to login or home page
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });


    // Clear session storage or cookies (if you're using them for login status)
    sessionStorage.clear();  // Clears session storage
    localStorage.clear();    // Clears local storage (if used)

    // Clear any cookies (if you are storing login status in cookies)
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Example for clearing cookies
    localStorage.removeItem('userName');
    // Redirect to login page
    window.location.href = 'login.html';
}
