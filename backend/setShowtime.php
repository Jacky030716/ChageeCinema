<?php
// Include Cors
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Database connection
require_once('./config.php');

// Get data from frontend
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and decode the raw POST data
    $data = file_get_contents('php://input');
    parse_str($data, $json_data);

    $movieID = $_GET['movieID'];

    // Retrieve and sanitize POST data
    $hallID = $conn->real_escape_string($json_data['hallID']);
    $locationID = $conn->real_escape_string($json_data['locationID']);
    $showtimeDate = $conn->real_escape_string($json_data['showtimeDate']);
    $showtime = $conn->real_escape_string($json_data['showtime']);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO movierelease (showID, hallID, locationID, showtimeDate, showtime, movieID) VALUES (UUID(), ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $hallID, $locationID, $showtimeDate, $showtime, $movieID);

    // Execute
    if ($stmt->execute()) {
        echo "Movie showtime added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Error: Invalid Request";
}
?>
