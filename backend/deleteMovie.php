<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }

    // Create connection to the database
    require_once('./config.php');

    // Check if userID is set
    if(isset($_GET['movieID'])) {
        $movieID =$_GET['movieID'];

        // Prepare SQL statement
        $sql = "
        DELETE FROM 
            movie
        WHERE
            movieID = ?
        ";

        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bind_param('i', $movieID);

        // Execute statement
        if($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Movie deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete movie']);
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
?>