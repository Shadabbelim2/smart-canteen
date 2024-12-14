<?php
// Start session
session_start();

// Set content type as JSON
header('Content-Type: application/json');

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'redirect' => false,
];

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['password'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];

        // Database connection
        $conn = new mysqli('localhost', 'root', '', 'user_db');
        if ($conn->connect_error) {
            $response['message'] = "Database connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit;
        }

        // Check if user already exists
        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $response['message'] = "User already exists! Plece Login ";
            $response['redirect'] = true; // Indicate redirection to login page
        } else {
            // Insert new user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (name, email, phone, password) VALUES ('$name', '$email', '$phone', '$hashed_password')";
            if ($conn->query($query)) {
                $response['success'] = true;
                $response['message'] = "Registration successful! Please log in.";
            } else {
                $response['message'] = "Error: " . $conn->error;
            }
        }

        $conn->close();
    } else {
        $response['message'] = "All fields are required.";
    }
} else {
    $response['message'] = "Invalid request method.";
}

// Return JSON response
echo json_encode($response);
?>
