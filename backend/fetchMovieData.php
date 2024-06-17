<?php 
    // Create connection to the database
    require_once('./config.php');

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM movie");

    // Execute statement
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Fetch result as associative array
    $data = $result->fetch_all(MYSQLI_ASSOC);

    // Encode image data in base64 format
    foreach ($data as $key => $value) {
        if (isset($value['moviePoster'])) {
            $data[$key]['moviePoster'] = base64_encode($value['moviePoster']);
        }
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // Return data as JSON
    echo json_encode($data);
?>
