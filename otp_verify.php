<?php
session_start();

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_otp = $_POST['otp'] ?? '';

    if ($user_otp == $_SESSION['otp']) {
        // If OTP matches
        $name = $_SESSION['name'];
        $email = $_SESSION['email'];
        $phone = $_SESSION['phone'];
        $password = $_SESSION['password'];

        $conn = new mysqli('localhost', 'root', '', 'user_db');
        if ($conn->connect_error) {
            $response['message'] = "Database connection failed.";
            echo json_encode($response);
            exit;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ssss', $name, $email, $phone, $hashed_password);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Registration successful!";
        } else {
            $response['message'] = "Error: " . $conn->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['message'] = "Invalid OTP.";
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);

?>
