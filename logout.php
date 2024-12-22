<?php
session_start(); // Session start karo

// Check karo agar user already logged in hai
if (isset($_SESSION['email'])) {
    // Session data destroy karo
    session_unset();  // Saari session variables ko unset kar do
    session_destroy(); // Purani session ko destroy kar do
    echo json_encode(['success' => true, 'message' => 'Logout successful']);
} else {
    // Agar user logged in nahi hai
    echo json_encode(['success' => false, 'message' => 'No active session found']);
}
exit;
?>
