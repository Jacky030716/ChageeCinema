<?php
// Include CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Start session
session_start();

// Create connection to database
require_once('./config.php');

// Function to sanitize input
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Get data from form and sanitize it
$contactNum = sanitize($_POST['contactNum']);
$password = sanitize($_POST['password']);

// Check if contact number and password are not empty
if (empty($contactNum) || empty($password)) {
    echo "Please provide both mobile number and password.";
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("SELECT userID, name, password FROM user WHERE contactNum = ?");
if ($stmt === false) {
    echo "Error preparing statement: " . $conn->error;
    exit;
}

$stmt->bind_param("s", $contactNum);

// Execute statement
$stmt->execute();
$stmt->store_result();

// Check if user exists
if ($stmt->num_rows > 0) {
    // Bind result variables
    $stmt->bind_result($userID, $name, $hashedPassword);
    $stmt->fetch();

    // Verify password
    if (password_verify($password, $hashedPassword)) {
        // Password is correct, start session
        $_SESSION['userID'] = $userID;
        $_SESSION['name'] = $name;
        echo "Login successful";
    } else {
        // Password is incorrect
        echo "Invalid password.";
    }
} else {
    // User does not exist
    echo "User not found";
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
