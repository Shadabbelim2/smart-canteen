<?php
session_start();

header('Content-Type: application/json'); // Ensure correct response type
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        $response['message'] = "All fields are required.";
        echo json_encode($response); // Send JSON response
        exit;
    }

    if (!str_ends_with($email, '@acropolis.in')) {
        $response['message'] = "Email must belong to the acropolis.in domain.";
        echo json_encode($response);
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'user_db');
    if ($conn->connect_error) {
        $response['message'] = "Database connection failed.";
        echo json_encode($response);
        exit;
    }

    $otp = rand(100000, 999999); // Random 6-digit OTP
    $_SESSION['otp'] = $otp;     // Store OTP in session
    $_SESSION['email'] = $email; // Store email temporarily

    // Temporarily skip email sending to avoid error in local development
    // Uncomment below code for live environments with proper SMTP configuration
    /*
    $to = $email;
    $subject = "OTP Verification - Smart Canteen";
    $message = "Your OTP for registration is: $otp";
    $headers = "From: no-reply@smartcanteen.com";
    if (!mail($to, $subject, $message, $headers)) {
        $response['message'] = "Failed to send OTP.";
        echo json_encode($response);
        exit;
    }
    */

    // For testing without email sending (remove this block if using SMTP)
    $response['message'] = "OTP sent successfully (skipped email for local testing).";

    // Check if user already exists
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response['message'] = "User already exists!";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ssss', $name, $email, $phone, $hashed_password);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Registration successful! OTP sent to email.";
        } else {
            $response['message'] = "Error: " . $conn->error;
        }
    }

    $stmt->close();
    $conn->close();
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response); // Return JSON response
?>
