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

// Check if data is received via POST have value
if (isset($_POST['name']) && isset($_POST['contactNum']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['dob']) && isset($_POST['gender']) && isset($_POST['location'])) {
    // Get data from form and sanitize it
    $name = sanitize($_POST['name']);
    $contactNum = sanitize($_POST['contactNum']);
    $email = sanitize($_POST['email']);
    $password = sanitize($_POST['password']);
    $dob = sanitize($_POST['dob']);
    $gender = sanitize($_POST['gender']);
    $location = sanitize($_POST['location']);
} else {
    echo "Please fill in all fields";
    exit();
}

// Check if contact number has been registered before
$checkStmt = $conn->prepare("SELECT contactNum FROM user WHERE contactNum = ?");
$checkStmt->bind_param("s", $contactNum);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo "Contact number has been registered before";
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO user 
    (userID, name, contactNum, email, password, dob, gender, location) 
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die('Error preparing statement');
}

// Bind parameters
$stmt->bind_param("sssssss", $name, $contactNum, $email, $hashedPassword, $dob, $gender, $location);

// Execute statement
if ($stmt->execute()) {
    echo "New user created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
