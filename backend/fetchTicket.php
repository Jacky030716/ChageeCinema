<?php
    // Create connection to the database
    require_once('./config.php');

    $userID = $_GET['userID'];

    // Prepare SQL statement
    $sql = "
    SELECT 
        l.locationName,
        h.hallID,
        m.movieTitle,
        m.moviePoster,
        mr.showtimeDate,
        mr.showtime,
        b.seatNumber,
        b.totalPrice
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
    JOIN
        movierelease mr ON b.showID = mr.showID
    WHERE
        u.userID = ?";

    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param('i', $userID);

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