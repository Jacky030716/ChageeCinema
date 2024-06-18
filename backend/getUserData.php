<?php
    // Create connection to the database
    require_once('./config.php');

    $userID = $_GET['userID'];

    // Prepare SQL statement
    $sql = "
    SELECT 
        *
    FROM 
        user
    WHERE
        userID = ?    
    ";

    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param('i', $userID);

    // Execute statement
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Fetch result as associative array
    $data = $result->fetch_assoc();

    // Encode image data in base64 format
    if (isset($data['userPic'])) {
        $data['userPic'] = base64_encode($data['userPic']);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // Return data as JSON
    echo json_encode($data);
?>