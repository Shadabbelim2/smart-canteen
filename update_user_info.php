<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

// Ensure user is logged in
if (!isset($_SESSION['email']) || empty($_SESSION['email'])) {
    $response['message'] = "User is not logged in.";
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate data
    $name = $data['name'] ?? '';
    $phone = $data['phone'] ?? '';

    if (empty($name) || empty($phone)) {
        $response['message'] = "Name and Phone cannot be empty.";
        echo json_encode($response);
        exit;
    }

    $email = $_SESSION['email'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'user_db');
    if ($conn->connect_error) {
        $response['message'] = "Database connection failed: " . $conn->connect_error;
        echo json_encode($response);
        exit;
    }

    // Update user data in the database
    $query = "UPDATE users SET name = ?, phone = ? WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sss', $name, $phone, $email);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "User information updated successfully.";
    } else {
        $response['message'] = "Failed to update user information.";
    }

    $stmt->close();
    $conn->close();

    echo json_encode($response);
} else {
    $response['message'] = "Invalid request method.";
    echo json_encode($response);
}
?>
