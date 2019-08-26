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
        $user_id = $request->user_id;    
        $user_name = $request->user_name;
        $user_email = $request->user_email;
        $user_password = $request->user_password;
        

        // if(empty($name) && empty($email) && empty($password)){
        //     $response="Profile is same and saved";
        // }
        
        $update_values = array();
        if($user_name != "")
            $update_values[] = "user_name='".$user_name."'";  
        if($user_email != "")
            $update_values[] = "user_email='".$user_email."'";
        if($user_password != "")
            $update_values[] = "user_password='".$user_password."'";
 
        $update_values_imploded = implode(', ', $update_values);

        
        if(!empty($update_values)) {
            $sql = "UPDATE users SET $update_values_imploded WHERE user_id='$user_id' ";
            if ($con->query($sql) === TRUE) 
              { $response= "Profile has been updated";}  
            else 
            { $response= "Error: " . $sql . "<br>" . $con->error; }
        }
        echo json_encode( $response);
}

?>