<?php
include 'config_timer.php';
include 'modules/crud.php';
include 'modules/functions.php';
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$post = file_get_contents("php://input");
$post = json_decode($post);

$sessionToken = $post -> sessionToken;

$selector = "`sessionToken`='$sessionToken'";

$data = crud_read('freeOrdersTimer_youtikin','',$selector);

$keyPermision ='';
if(empty($data)){
    $data['permissionKey'] = generateRandomString();
    $data['sessionToken']=$sessionToken;
    $data['ip'] = $_SERVER['REMOTE_ADDR'];
    crud_create('freeOrdersTimer_youtikin', $data);
}else{
    if(checkTimout(3, $data[0]['date_time'])){ 
        $keyPermision = $data[0]['permissionKey'];
        $note['sendKey']="true";
        crud_update('freeOrdersTimer_youtikin', $note, $selector);
    }
}

$result = (object) [
    'success' => true,
    'data' => $keyPermision,
];

echo json_encode($result);

?>