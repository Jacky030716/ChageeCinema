<?php
    // Create connection to the database
    require_once('./config.php');

    // Prepare SQL statement
    $sql = "
    SELECT 
        ms.showID,
        ms.showtimeDate,
        ms.showtime,
        h.hallType,
        h.hallID,
        l.locationName,
        l.locationID,
        l.state,
        m.movieID
    FROM 
        movierelease ms
    JOIN 
        hall h ON ms.hallID = h.hallID
    JOIN 
        location l ON ms.locationID = l.locationID
    JOIN 
        movie m ON ms.movieID = m.movieID";

    $stmt = $conn->prepare($sql);

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