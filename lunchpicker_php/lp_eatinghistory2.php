<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}
    require "lp_dbconfig.php";
    $data = file_get_contents("php://input");
    if (isset($data)) {
        $request = json_decode($data);
        $id = $request->id;
    }
    
    $sql = "SELECT *, cuisines.cuisine_name FROM eatingHistory INNER JOIN cuisines
    ON eatingHistory.cuisine_id = cuisines.cuisine_id  WHERE id='$id';";
    $result = mysqli_query($con, $sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
?>