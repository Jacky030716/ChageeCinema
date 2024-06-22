<?php
    // Create connection to the database
    require_once('./config.php');

    // Prepare SQL statement for the 'location' table
    $sql = "SELECT * FROM location";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $locationData = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    // Prepare SQL statement for the 'hall' table
    $sql = "SELECT * FROM hall";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $hallData = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    // Close connection
    $conn->close();

    // Combine data from both tables into a single array
    $data = [
        'location' => $locationData,
        'hall' => $hallData
    ];

    // Return data as JSON
    echo json_encode($data);
?>