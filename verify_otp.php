<?php
session_start();

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $otp = $data['otp'] ?? '';

    if (!isset($_SESSION['otp']) || !isset($_SESSION['email'])) {
        $response['message'] = "Session expired. Please start the process again.";
        echo json_encode($response);
        exit;
    }

    if ($otp == $_SESSION['otp']) {
        $_SESSION['verified'] = true; // Mark as verified
        $response['success'] = true;
        $response['message'] = "OTP verified successfully!";
    } else {
        $response['message'] = "Invalid OTP. Please try again.";
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
