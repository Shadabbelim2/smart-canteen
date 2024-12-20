<?php
session_start();

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['verified']) || !$_SESSION['verified'] || !isset($_SESSION['email'])) {
        $response['message'] = "Unauthorized access or session expired.";
        echo json_encode($response);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $password = $data['password'] ?? '';

    if (empty($password)) {
        $response['message'] = "Password cannot be empty.";
        echo json_encode($response);
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'user_db');
    if ($conn->connect_error) {
        $response['message'] = "Database connection failed.";
        echo json_encode($response);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $query = "UPDATE users SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $hashed_password, $_SESSION['email']);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Password reset successful!";
        session_destroy(); // End the session after successful reset
    } else {
        $response['message'] = "Error: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
