<?php

include 'config.php';
include 'modules/crud.php';
include 'modules/functions.php';
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$post = file_get_contents("php://input");
$post = json_decode($post);

$sessionToken = $post -> sessionToken;
$page = $post -> page;
$probability_winning = 2;

if(isset($page)){
    $main_url = $_SERVER['HTTP_REFERER'];
    $main_url = str_replace('https://', '', $main_url);
    $main_url = str_replace('/', '', $main_url);
    $table = 'pages_free_youtikin';
    if($main_url=='youtikin.com') $table = 'pages_free_youtikin';
    $selector = "`page`='$page'";
    $result = crud_read($table,'',$selector);
    $result = $result[0]['probability_winning'];
    if(isset($result)) $probability_winning = (integer)$result;
}



if($probability_winning!=0){
    $number_events_of_winning = 100/$probability_winning;
    $number_events_of_winning = $number_events_of_winning  * 100;
    $play_result = rand(0, $number_events_of_winning);
}else{
    $play_result = 200;
}

$test = $play_result;

if($play_result<=100){
    $data['wheel'] = 0;
}else{
    $data['wheel'] = rand(1,5);
}

if($data['wheel']==0){
    include 'config_timer.php';
    $selector = "`sessionToken`='$sessionToken'";
    $result = crud_read('freeOrdersTimer_youtikin','',$selector);
    $data['permissionKey'] = $result[0]['permissionKey'];
}

$result = (object) [
    'success' => true,
    'data' => $data,
    //'test' => $test,
];

echo json_encode($result);

?>