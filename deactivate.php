<?php
// deactivate.php
session_start(); // Start the session

if (isset($_GET['days']) && isset($_GET['reason'])) {
  $days = $_GET['days'];
  $reason = $_GET['reason'];

  // User ki account ko deactivate karne ke liye database mein updates
  $deactivation_date = date('Y-m-d', strtotime("+$days days"));
  $user_id = $_SESSION['user_id']; // Assuming user is logged in
  $query = "UPDATE users SET status='deactivated', deactivation_date='$deactivation_date', deactivation_reason='$reason' WHERE id=$user_id";
  
  // Execute the query to deactivate the account
  
  // Destroy the session and clear the user data
  session_unset(); // Remove all session variables
  session_destroy(); // Destroy the session

  // Redirect to login page
  header("Location: login.html"); // Redirecting to login page
  exit();
}
?>
