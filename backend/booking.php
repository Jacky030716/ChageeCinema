<?php
    // Database connection
    require_once('./config.php');

    // Get data from frontend
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the raw POST data
        $data = file_get_contents('php://input');
        $json_data = json_decode($data, true);

        // Retrieve and sanitize POST data
        $showID = $conn->real_escape_string($json_data['showID']);
        $hallID = $conn->real_escape_string($json_data['hallID']);
        $locationID = $conn->real_escape_string($json_data['locationID']);
        $seatNumber = $conn->real_escape_string($json_data['seatNumber']);
        $movieID = intval($json_data['movieID']);
        $totalPrice = floatval($json_data['totalPrice']);

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO booking (bookingID, showID, hallID, locationID, seatNumber, movieID, totalPrice) VALUES (UUID(), ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssdi", $showID, $hallID, $locationID, $seatNumber, $movieID, $totalPrice);

        // Execute
        if($stmt->execute()) {
            echo "New record created successfully";
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