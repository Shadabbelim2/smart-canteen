<?php
session_start();

if (isset($_SESSION['user'])) {
    // If session is set, return user's name
    echo json_encode(['status' => 'success', 'name' => $_SESSION['name']]);
} else {
    // If session is not set, return error
    echo json_encode(['status' => 'error']);
}
?>
