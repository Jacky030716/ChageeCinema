<?php
    // Create connection to database
    require_once('./config.php');

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM ticketprice");

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
?>