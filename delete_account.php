<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if (!isset($_SESSION['email']) || empty($_SESSION['email'])) {
    session_unset();  // Saari session variables ko unset kar do
    session_destroy();
    $response['message'] = "User is not logged in.";
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

// Begin transaction
$conn->begin_transaction();

try {
    // Step 1: Delete orders related to the user
    $queryOrders = "DELETE FROM orders WHERE email = ?";
    $stmtOrders = $conn->prepare($queryOrders);
    $stmtOrders->bind_param('s', $email);
    $stmtOrders->execute();
    $stmtOrders->close();

    // Step 2: Delete the user
    $queryUser = "DELETE FROM users WHERE email = ?";
    $stmtUser = $conn->prepare($queryUser);
    $stmtUser->bind_param('s', $email);
    $stmtUser->execute();
    $stmtUser->close();

    // Commit transaction
    $conn->commit();

    // Destroy session
    session_unset();
    session_destroy();

    $response['success'] = true;
    $response['message'] = "Account and all related data deleted successfully.";
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    $response['message'] = "Failed to delete account. Error: " . $e->getMessage();
}

// Close connection
$conn->close();

echo json_encode($response);
?>
