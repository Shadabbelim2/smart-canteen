<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@acropolis.in')) {
        $response['message'] = "Invalid email or not @acropolis.in.";
        echo json_encode($response);
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'user_db');
    if ($conn->connect_error) {
        $response['message'] = "Database connection failed.";
        echo json_encode($response);
        exit;
    }

    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $otp = rand(100000, 999999);
        $_SESSION['otp'] = $otp;
        $_SESSION['email'] = $email;

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'shadabbelim008@gmail.com';
            $mail->Password = 'wdlp sofo vtpn gmkf';;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('shadabbelim008@gmail.com', 'Smart Canteen');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = 'OTP for Password Reset';
            $mail->Body = "Your OTP is $otp.";

            $mail->send();
            $response['success'] = true;
            $response['message'] = "OTP sent to your email.";
        } catch (Exception $e) {
            $response['message'] = "Error sending OTP: " . $mail->ErrorInfo;
        }
    } else {
        $response['message'] = "Email not registered.";
    }

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
?>
