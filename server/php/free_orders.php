<?php

echo "ok";

include 'config.php';
include 'getConfigs.php';
include 'provader_functions.php';

function noteOrder($data){
    global $mysql;
    $page = $data['url_page'];
    $name_servis = $data['quantity-text'];
    $service = $data['service'];
    $link = $data['post-link'];
    $quantity = $data['quantity'];
    $quantity_max = $data['quantity_max'];
    $id_provider = $data['id_provider'];
    $result = $data['result'] -> message;

    $sessionToken = $data['sessionToken'];
    $permissionKey = $data['permissionKey'];
    $usedKey = $_POST['usedKey'];

    $sql = "INSERT INTO `orders_free_youtikin` 
    (`page`, `name_servis`, `service`, `link`, `quantity`, `quantity_max`, `id_provider`, `provider_msg`, `sessionToken`, `permissionKey`, `usedKey` )
    VALUES
    ('$page', '$name_servis', '$service', '$link', '$quantity', '$quantity_max', '$id_provider', '$result', '$sessionToken', '$permissionKey', '$usedKey')";
    //push_log(json_encode($sql), basename(__FILE__), 'free_order_log');
    $mysql -> query($sql);
}

function findSameLink($pause, $link){
    global $mysql;
    $timePause = time() - $pause * 60 * 60;
    $untilDate = date('Y-m-d H:i:s', $timePause);
    $sql = "SELECT `id` from `orders_free_youtikin` WHERE `link` = '$link' AND `datetime` > '$untilDate' "; 
    $result = $mysql -> query($sql);
    $result = $result -> fetch_assoc();
    $result = $result['id'];
    return $result;
}

//push_log(json_encode($_POST), basename(__FILE__), 'free_order_log');

$pauseServis_hours = (int)$configs['pause_free_orders_h'];
$pauseServis_hours_by_ip = (int)$configs['pause_free_orders_h_by_ip'];
$limit_orders_by_ip = (int)$configs['limit_orders_by_ip'];
$block_by_ip = $configs['block_by_ip'];
$quantity_max = $configs['quantity_max_free_orderd'];
$id_provider = $configs['provider_free_orders'];

$api_key = $_POST['api_k'];
$quantity = $_POST['quantity'];
$service = $_POST['service'];
$link = $_POST['link'];

if($api_key != _APY_KEY_){ exit(); }
include 'chekPermissionKey.php';
include 'free_orders_check_freeuser.php';

if(isset($_POST['url_page'])){
    $url = $_POST['url_page'];
    $sql ="SELECT * from `pages_free_youtikin` WHERE `page` = '$url'";
    $result = $mysql -> query($sql);
    $result = $result -> fetch_assoc();
    if(isset($result['id_provider'])){
        $quantity_max = $result['quantity_max'];
        $id_provider = $result['id_provider'];
    }
    if(isset($result['pause_h'])) $pauseServis_hours = (int)$result['pause_h'];
    //push_log(json_encode($pauseServis_hours), basename(__FILE__), 'free_order_log');
}

if((int)$quantity > (int)$quantity_max){ $quantity = $quantity_max;}

$sameLink_id = findSameLink($pauseServis_hours, $link);
if( isset($sameLink_id)){
    //push_log(json_encode("deny by same link ".$link), basename(__FILE__), 'free_order_log');
    exit();
}

$_POST['post-link'] = $link;
$_POST['prodavec_id'] = $id_provider;
$data = getDataProv($_POST, $mysql);

if($deny_order){
    $result = (object) [
        'message' => 'fall by key',
    ];
}else{
    $result = sendOrderProvader($data);
} 

$_POST['id_provider'] = $id_provider;
$_POST['result'] = $result;
$_POST['quantity_max'] = $quantity_max;
noteOrder($_POST);
//push_log(json_encode($data), basename(__FILE__), 'free_order_log');
///push_log(json_encode($result), basename(__FILE__), 'free_order_log');
?>