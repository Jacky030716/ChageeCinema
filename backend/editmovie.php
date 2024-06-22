<?php 
// Include CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Create connection to database
require_once('./config.php');

// Function to sanitize input
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

// Get user id
$movieID = sanitize($_GET['movieID']);

// Get edited data from form and sanitize it
$movieTitle = sanitize($_POST['movieTitle']);
$duration = sanitize($_POST['duration']);
$language = sanitize($_POST['language']);

// Prepare SQL statement
$stmt = $conn->prepare("UPDATE movie SET movieTitle = ?, duration = ?, language = ? WHERE movieID = ?");

// Bind parameters
$stmt->bind_param("ssss", $movieTitle, $duration, $language, $movieID);

// Execute statement
if ($stmt->execute()) {
    echo "Record updated successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
