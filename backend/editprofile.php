<?php 
// Include CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
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
$userID = ($_GET['userID']);

// Get edited data from form and sanitize it
$name = sanitize($_POST['name']);
$contactNum = sanitize($_POST['contactNum']);
$email = sanitize($_POST['email']);
$gender = sanitize($_POST['gender']);
$dob = sanitize($_POST['dob']);

// Prepare SQL statement
$stmt = $conn->prepare("UPDATE user 
    SET 
        name = ?,
        contactNum = ?,
        email = ?,
        gender = ?,
        dob = ?
    WHERE userID = ?");

// Bind parameters
$stmt->bind_param("ssssss", $name, $contactNum, $email, $gender, $dob, $userID);

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