<?php
    // Create connection to the database
    require_once('./config.php');

    // Prepare SQL statement
    $sql = "
    SELECT 
        l.locationName,
        h.hallID,
        m.movieTitle,
        b.createdAt,
        u.name
    FROM 
        booking b
    JOIN 
        hall h ON b.hallID = h.hallID
    JOIN 
        location l ON b.locationID = l.locationID
    JOIN 
        movie m ON b.movieID = m.movieID
    JOIN
        user u ON b.userID = u.userID
    ORDER BY
        b.createdAt DESC
    ";

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