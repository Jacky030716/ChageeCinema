<?php
// Include CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Include database configuration
require_once('./config.php');

// Sanitize the data received from the form
function sanitize($input) {
    global $conn;
    return htmlspecialchars(strip_tags(trim($conn->real_escape_string($input))));
}

// Check if data is received via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get userID from URL parameter
    $userID = sanitize($_GET['userID']);

    // Get data from form and sanitize it
    $oldPassword = sanitize($_POST['oldPassword']);
    $newPassword = sanitize($_POST['newPassword']);
    $confirmPassword = sanitize($_POST['confirmPassword']);

    // Validate old password is the same as the password in the database
    $stmt = $conn->prepare("SELECT password FROM user WHERE userID = ?");
    if ($stmt === false) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
        exit;
    }

    // Bind parameters
    $stmt->bind_param("s", $userID);

    // Execute statement
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows == 0) {
        echo "User not found";
        exit;
    }

    // Bind result variables
    $stmt->bind_result($hashedPassword);

    // Fetch result
    $stmt->fetch();

    // Verify old password
    if (password_verify($oldPassword, $hashedPassword)) {
        // Password is correct

        // Check if new password matches confirm password
        if ($newPassword !== $confirmPassword) {
            echo "Password not same";
            exit;
        }

        // Hash the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        // Prepare SQL statement to update password
        $stmt = $conn->prepare("UPDATE user SET password = ? WHERE userID = ?");
        if ($stmt === false) {
            echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
            exit;
        }

        // Bind parameters
        $stmt->bind_param("ss", $hashedPassword, $userID);

        // Execute statement
        if ($stmt->execute()) {
            echo "Password updated successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement
        $stmt->close();

    } else {
        // Password is incorrect
        echo "Old password is incorrect";
    }

} else {
    // Method not allowed
    echo "Method not allowed";
}

// Close connection
$conn->close();
?>
