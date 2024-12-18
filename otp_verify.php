<?php
session_start();
header('Content-Type: application/json');

$response = [
    'success' => false,
    'message' => '',
];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['otp'])) {
        $userOtp = $_POST['otp'];

        if ($userOtp == $_SESSION['otp']) {
            $response['success'] = true;
            $response['message'] = "OTP verified successfully!";
        } else {
            $response['message'] = "Invalid OTP!";
        }
    } else {
        $response['message'] = "OTP is required.";
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
