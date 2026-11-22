<?php
session_start();
header("Content-Type: application/json");
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user['password'])) {

    // ✅ STORE SESSION
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "redirect" => "dashboard.php"
    ]);
    
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);
}
?>