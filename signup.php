<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  // PHPMailer's autoloader

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        $response['message'] = "All fields are required.";
        echo json_encode($response);
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

    $otp = rand(100000, 999999); // Random OTP
    $_SESSION['otp'] = $otp;     // Store OTP in session
    $_SESSION['email'] = $email; // Store email temporarily

    // Send OTP to user email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                   // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                              // Enable SMTP authentication
        $mail->Username   = 'shadabbelim008@gmail.com';            // SMTP username (your Gmail)
        $mail->Password   = 'wdlp sofo vtpn gmkf';             // SMTP password (your Gmail password or app password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    // Enable TLS encryption
        $mail->Port       = 587;                               // TCP port to connect to

        //Recipients
        $mail->setFrom('shadabbelim008@gmail.com', 'Smart Canteen');
        $mail->addAddress($email);                             // Add a recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Email Verification - Smart Canteen';
        $mail->Body    = "Your OTP for email verification is: $otp";

        // Send the email
        $mail->send();

        // Insert user into database
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response['message'] = "User already exists!";
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (name, email, phone, password, is_verified) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $is_verified = false; // Initially not verified
            $stmt->bind_param('ssssi', $name, $email, $phone, $hashed_password, $is_verified);
            if ($stmt->execute()) {
                $response['success'] = true;
                $response['message'] = "Registration successful! OTP sent to email.";
            } else {
                $response['message'] = "Error: " . $conn->error;
            }
        }

        $stmt->close();
        $conn->close();

    } catch (Exception $e) {
        $response['message'] = "Failed to send OTP. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
