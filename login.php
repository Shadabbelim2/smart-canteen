<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'user_name' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        $conn = new mysqli('localhost', 'root', '', 'user_db');
        if ($conn->connect_error) {
            $response['message'] = "Database connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit;
        }

        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                if ($user['is_verified'] == 1) {
                    $response['success'] = true;
                    $response['message'] = "Login successful!";
                    $response['user_name'] = $user['name'];
                } else {
                    $response['message'] = "Please verify your email before logging in.";
                }
            } else {
                $response['message'] = "Invalid credentials. Please try again.";
            }
        } else {
            $response['message'] = "Account not found! Please sign up.";
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['message'] = "Please fill in both email and password.";
    }
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
