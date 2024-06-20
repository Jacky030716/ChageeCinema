<?php
// Include CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Database connection
require_once('./config.php');

// Function to sanitize input
function sanitize($input, $conn) {
    return htmlspecialchars(strip_tags(trim($conn->real_escape_string($input))));
}

// Check request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input data
    $movieTitle = sanitize($_POST['movieTitle'], $conn);
    $duration = sanitize($_POST['duration'], $conn);
    $language = sanitize($_POST['language'], $conn);
    $moviePoster = $_POST['moviePoster']; 

    // Decode base64 poster data
    $decodedPoster = base64_decode($moviePoster);

    // Prepare SQL statement to insert into database
    $sql = "INSERT INTO movie (movieTitle, duration, language, moviePoster) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die('Error preparing statement: ' . htmlspecialchars($conn->error));
    }

    $stmt->bind_param("ssss", $movieTitle, $duration, $language, $decodedPoster);

    // Execute SQL statement
    if ($stmt->execute() === TRUE) {
        echo "New movie added successfully";
    } else {
        echo "Error: " . htmlspecialchars($stmt->error);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
