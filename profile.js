// Logout Button Click Event
document.getElementById('logout-btn').addEventListener('click', () => {
    alert('You have been logged out!');
    // Clear session or redirect to login page
    window.location.href = 'login.html';
  });
  
  // Delete Profile (Permanent) Click Event
  document.getElementById('delete-profile-btn').addEventListener('click', () => {
    const confirmation = confirm(
      'Are you sure you want to delete your profile permanently? This action cannot be undone!'
    );
    if (confirmation) {
      // Logic to delete user profile
      alert('Your profile has been deleted permanently.');
      window.location.href = 'index.html'; // Redirect to home page
    }
  });
  
  // Deactivate Profile (Temporarily) Click Event
  document.getElementById('deactivate-profile-btn').addEventListener('click', () => {
    const confirmation = confirm(
      'Do you want to temporarily deactivate your account?'
    );
    if (confirmation) {
      // Logic to deactivate user profile
      alert('Your profile has been deactivated temporarily.');
    }
  });
  