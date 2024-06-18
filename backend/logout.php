<?php
// Include CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Start session
session_start();

// Destroy the session
session_destroy();

// Return response
echo json_encode([
    "status" => "success",
    "message" => "User logged out successfully."
]);
?>
