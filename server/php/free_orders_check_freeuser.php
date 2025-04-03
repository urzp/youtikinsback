<?php

function countOrdersHour($freeUserData){
    $lastActivity = (time() -  strtotime($freeUserData['last_activity']));
    if( $lastActivity > 1 ){
        return 0;
    }else{
        return (int)$freeUserData['orders_until_block'];
    }
}

//-----------------------------------------------------------------------------------------
$limitOrdersInHour = 3;
$blockHours = 1;
$blockUser = true;

$mysql_main = $mysql;
include 'config_timer.php';
include 'modules/crud.php';
$mysql_2 = $mysql;

if ($blockUser){

    $freeUser = $_POST['freeUser'];
    $selector = "`name`= '$freeUser'";

    $freeUserData =  crud_read('freeUsers', "*", $selector)[0];
    if(isset($freeUserData)){
        if( strtotime($freeUserData['block_until']) > time() ){
            push_log(json_encode('block'), basename(__FILE__), 'free_order_log');
        }else{
            $orders = (int)$freeUserData['orders'] + 1;
            $orders_until_block = countOrdersHour($freeUserData) + 1;

            if($orders_until_block>=$limitOrdersInHour){
                $currentDate = time();
                $futureDate = $currentDate+(60*60*$blockHours);
                $formatDate = date("Y-m-d H:i:s", $futureDate);
                $data['block_until'] = $formatDate;
            }

            $data['orders'] = $orders;
            $data['orders_until_block'] = $orders_until_block;
            crud_update('freeUsers', $data, $selector);
        }
    }else{
        push_log(json_encode('nofind'), basename(__FILE__), 'free_order_log');
    }

}

$mysql=$mysql_main;
?>