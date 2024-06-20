<?php
// Include CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['adminID'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Admin not logged in."
    ]);
    exit;
}

// Return session data
echo json_encode([
    "status" => "success",
    "adminID" => $_SESSION['adminID'],
    "adminUsername" => $_SESSION['adminUsername']
]);
?>
