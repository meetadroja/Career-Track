<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: index.html');
    exit;
}

$user_email = $_SESSION['user_email'] ?? 'User';

// Handle logout
if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to Dashboard, <?php echo htmlspecialchars($user_email); ?>!</h1>
        <p>You have successfully logged in.</p>
        
        <div class="dashboard-content">
            <h2>Your Dashboard</h2>
            <ul>
                <li>User ID: <?php echo $_SESSION['user_id']; ?></li>
                <li>Email: <?php echo htmlspecialchars($user_email); ?></li>
                <!-- Add more dashboard features here in future -->
            </ul>
        </div>
        
        <form method="POST" class="logout-form">
            <button type="submit" name="logout" class="btn btn-danger">Logout</button>
        </form>
        
        <p><a href="index.html">Back to Home</a></p>
    </div>
</body>
</html>
