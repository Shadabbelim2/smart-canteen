<?php
session_start();

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $otp = $_POST['otp'] ?? '';
    $email = $_SESSION['email'] ?? '';

    if (empty($otp)) {
        $response['message'] = "OTP is required.";
        echo json_encode($response);
        exit;
    }

    if ($otp == $_SESSION['otp']) {
        // OTP is correct, update user as verified
        $conn = new mysqli('localhost', 'root', '', 'user_db');
        if ($conn->connect_error) {
            $response['message'] = "Database connection failed.";
            echo json_encode($response);
            exit;
        }

        $query = "UPDATE users SET is_verified = 1 WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $email);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Email verified successfully!";
        } else {
            $response['message'] = "Error in verification.";
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
