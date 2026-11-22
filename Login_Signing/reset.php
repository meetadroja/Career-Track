<?php
header("Content-Type: application/json");
include "db.php";

$email = $_POST['email'];

// Generate new password
$newPassword = "123456"; // You can randomize
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Check user
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email not found"
    ]);
    exit;
}

// Update password
$update = $conn->prepare("UPDATE users SET password=? WHERE email=?");
$update->bind_param("ss", $hashedPassword, $email);

if ($update->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Password reset to 123456"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Reset failed"
    ]);
}
?>