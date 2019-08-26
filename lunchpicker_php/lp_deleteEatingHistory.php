<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
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
        $id = $request->id;    

        // if(empty($name) && empty($email) && empty($password)){
        //     $response="Profile is same and saved";
        // }

            $sql = "DELETE FROM eatingHistory WHERE id='$id'";
            if ($con->query($sql) === TRUE) 
              { $response= "Delete process is successful";}  
            else 
            { $response= "Error: " . $sql . "<br>" . $con->error; }

        echo json_encode( $response);
}

?>