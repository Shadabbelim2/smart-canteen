<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'user_db');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Fetch user details
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Login successful, set session
            $_SESSION['user'] = $user['email'];
            $_SESSION['name'] = $user['name']; // Storing name in session

            echo json_encode(['status' => 'success', 'name' => $user['name']]);
            exit;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid password.']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
        exit;
    }
}

?>
