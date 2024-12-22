<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(['success' => false, 'message' => 'User is not logged in']);
    exit;
}

$email = $_SESSION['email']; // Logged-in user's email

// Database connection
$conn = new mysqli('localhost', 'root', '', 'user_db');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Fetch orders for the logged-in user
$query = "SELECT order_token, order_time, items, total_price FROM orders WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = [
        'orderToken' => $row['order_token'],
        'orderTime' => $row['order_time'],
        'items' => json_decode($row['items']), // Decode JSON string
        'total' => $row['total_price']
    ];
}

echo json_encode(['success' => true, 'orders' => $orders]);

$stmt->close();
$conn->close();
?>
