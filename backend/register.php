<?php
    // Create connection to database
    require_once('./config.php');

    // Get data from form
    $name = $_POST['name'];
    $contactNum = $_POST['contactNum'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $confirmPassword = $_POST['confirmPassword'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $location = $_POST['location'];

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO user 
        (userID, name, contactNum, email, password, dob, gender, location) 
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)");

    // Bind parameters
    $stmt->bind_param("sssssss", $name, $contactNum, $email, $password, $dob, $gender, $location);
    
    // Execute statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
?>
