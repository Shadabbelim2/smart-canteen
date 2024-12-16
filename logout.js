function logout() {
    // Clear session storage or cookies (if you're using them for login status)
    sessionStorage.clear();  // Clears session storage
    localStorage.clear();    // Clears local storage (if used)

    // Clear any cookies (if you are storing login status in cookies)
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Example for clearing cookies

    // Redirect to login page
    window.location.href = 'login.html';
}
