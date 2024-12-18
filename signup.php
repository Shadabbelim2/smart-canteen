<?php
session_start();

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
            $response['message'] = "Registration successful!";
        } else {
            $response['message'] = "Error: " . $conn->error;
        }
    }

    $stmt->close();
    $conn->close();
} else {
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
