<?php
include 'config_timer.php';
include 'modules/functions.php';
include 'modules/crud.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$ip = '';
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$time = time();

$user_key = generateRandomString();

$name = $user_key.'_'.$time.'_'.$ip;

$data['name']=$name;
$data['ip']=$ip;
$data['user_key']=$user_key;
$data['lastActivityUnix'] = time();
crud_create('freeUsers', $data);

$result = (object) [
    'success' => true,
    'name' => $name,
    'data' => $data,
];

echo json_encode( $result );

?>