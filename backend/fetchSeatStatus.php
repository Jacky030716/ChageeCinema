<?php
// Create connection to database
require_once('./config.php');

// Get parameters from request
$showID = $_GET['showID'];

// Prepare SQL statement
$sql = "
SELECT 
    seatNumber
FROM
    booking 
WHERE
    showID = ?";

$stmt = $conn->prepare($sql);

// Bind parameters to statement
$stmt->bind_param("s", $showID);

// Execute statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Fetch result as associative array
$data = $result->fetch_all(MYSQLI_ASSOC);

// Close statement and connection
$stmt->close();
$conn->close();

// Return data as JSON
echo json_encode($data);

// 
?>