<?php
// Start session
session_start();

// Set response content type to JSON
header('Content-Type: application/json');

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'user_name' => ''
];

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // Check if email and password are provided
    if (!empty($email) && !empty($password)) {
        // Connect to database
        $conn = new mysqli('localhost', 'root', '', 'user_db');
        if ($conn->connect_error) {
            $response['message'] = "Database connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit;
        }

        // Check if user exists
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User exists, verify password
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Password matches
                $response['success'] = true;
                $response['message'] = "Login successful!";
                $response['user_name'] = $user['name']; // Send user name in the response
            } else {
                // Incorrect password
                $response['message'] = "Invalid credentials. Please try again.";
            }
        } else {
            // User doesn't exist
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

// Return JSON response
echo json_encode($response);
?>
