<?php
// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    // User not logged in, send error response
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in'
    ]);
    exit;
}

// User is logged in, send success response
echo json_encode([
    'status' => 'success',
    'message' => 'Session is active'
]);
?>
