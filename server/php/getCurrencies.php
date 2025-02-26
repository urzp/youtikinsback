<?php

include 'config_timer.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$sql = "SELECT `name`, `value` FROM `currency` ";
$sql_result = $mysql -> query($sql);


$data = [];
foreach($sql_result as $item){
    $data[$item['name']] = (float)$item['value'];
}

echo json_encode(array('response' => $data));

?>