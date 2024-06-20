<?php
    // Create connection to the database
    require_once('./config.php');

    $adminID = $_GET['adminID'];

    // Prepare SQL statement
    $sql = "
    SELECT 
        *
    FROM 
        admin
    WHERE
        adminID = ?    
    ";

    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param('i', $adminID);

    // Execute statement
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Fetch result as associative array
    $data = $result->fetch_assoc();

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // Return data as JSON
    echo json_encode($data);
?>