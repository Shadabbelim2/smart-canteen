<?php
session_start();

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // Ensure JSON response

// Check if the user is logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(['success' => false, 'message' => 'User is not logged in']);
    exit;
}

$email = $_SESSION['email']; // Get user email from session
$orderToken = $_POST['orderToken'] ?? ''; // Order token
$items = $_POST['items'] ?? ''; // Order items in JSON format
$totalPrice = $_POST['total'] ?? 0; // Total price
$paymentMethod = $_POST['paymentMethod'] ?? ''; // Payment method

// Generate current date and time in Y-m-d H:i:s format
$orderTime = date('Y-m-d H:i:s');

// Validate input data
if (empty($orderToken) || empty($items) || empty($paymentMethod) || $totalPrice <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid order details']);
    exit;
}

// Database connection
$conn = new mysqli('localhost', 'root', '', 'user_db');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Insert the order into the database
$query = "INSERT INTO orders (email, order_token, order_time, items, total_price, payment_method) 
          VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare statement']);
    $conn->close();
    exit;
}

// Bind parameters and execute query
$stmt->bind_param('ssssds', $email, $orderToken, $orderTime, $items, $totalPrice, $paymentMethod);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to place order: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
