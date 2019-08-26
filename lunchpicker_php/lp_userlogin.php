<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");        
       if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

    require "lp_dbconfig.php";
    $data = file_get_contents("php://input");
    
    if (isset($data)) {

        $request = json_decode($data);
        $user_email = $request->user_email;
        $user_password = $request->user_password;
        }

        $user_email = stripslashes($user_email);
        //$user_password = stripslashes($user_password);

	    // //check if user already exists
	    // $sql_check="SELECT * FROM users WHERE email='$email'";
	    // $check_result=mysqli_query($con,$sql_check);
	    // $data=mysqli_fetch_array($check_result,MYSQLI_ASSOC);

        //$user_password = md5('user_password');
		$sql = "SELECT * FROM users WHERE user_email='$user_email' AND user_password='$user_password'";

        $result = mysqli_query($con,$sql);
        $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        $count = mysqli_num_rows($result);
        
	    if ($count > 0) {
            $response= $row['user_id'];
     	} 
		else {
            $response= "Error: " . $sql . "<br>" . $db->error;
           
	    }
	    echo json_encode( $response);
		

?>