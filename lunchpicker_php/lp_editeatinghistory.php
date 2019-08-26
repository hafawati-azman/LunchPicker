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
        $history_date = $request->history_date;
        $cuisine_id = $request->cuisine_id;
        $restaurant_name = $request->restaurant_name;
        $food_price = $request->food_price;
            

        // if(empty($name) && empty($email) && empty($password)){
        //     $response="Profile is same and saved";
        // }

        $update_values = array();

        if($history_date != "")
            $update_values[] = "history_date='".$history_date."'";
        if($cuisine_id != "")
            $update_values[] = "cuisine_id='".$cuisine_id."'";
        if($restaurant_name != "")
             $update_values[] = "restaurant_name='".$restaurant_name."'";
        if($food_price != "")
              $update_values[] = "food_price='".$food_price."'";
 
        $update_values_imploded = implode(', ', $update_values);

        if(!empty($update_values)) {
            $sql = "UPDATE eatingHistory SET $update_values_imploded WHERE id='$id' ";
            if ($con->query($sql) === TRUE) 
              { $response= "Eating history has been updated";}  
            else 
            { $response= "Error: " . $sql . "<br>" . $con->error; }
        }
        echo json_encode( $response);
}

?>