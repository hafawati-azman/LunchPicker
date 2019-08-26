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
        $cuisine_id = $request->cuisine_id;
        $restaurant_price = $request->restaurant_price;
        }

		$sql = "SELECT * FROM restaurants WHERE cuisine_id=$cuisine_id AND restaurant_price BETWEEN 0 AND $restaurant_price";

        $result = mysqli_query($con,$sql);
        // $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        // $count = mysqli_num_rows($result);
        
	    // if ($count > 0) {
        //     $response= $row['restaurant_name'];
     	// } 
		// else {
	    //     $response= "Error: " . $sql . "<br>" . $db->error;
	    // }
        // echo json_encode( $response);
        $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
		

?>