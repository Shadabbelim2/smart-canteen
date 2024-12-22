<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'user_data' => null];

// Ensure user is logged in
if (!isset($_SESSION['email']) || empty($_SESSION['email'])) {
    $response['message'] = "User is not logged in.";
    echo json_encode($response);  // Return JSON response
    exit;
}

$email = $_SESSION['email'];

// Database connection
$conn = new mysqli('localhost', 'root', '', 'user_db');
if ($conn->connect_error) {
    $response['message'] = "Database connection failed: " . $conn->connect_error;
    echo json_encode($response);  // Return JSON response
    exit;
}

// Fetch user data from the database
$query = "SELECT name, email, phone FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user_data = $result->fetch_assoc();
    $response['success'] = true;
    $response['user_data'] = $user_data;
} else {
    $response['message'] = "No user found with this email.";
}

$stmt->close();
$conn->close();

// Return the response in JSON format
echo json_encode($response);
?>
