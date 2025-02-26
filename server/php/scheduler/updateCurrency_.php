<?php

//$req = 'https://v6.exchangerate-api.com/v6/e0c6921cbbf48c421b36e38c/latest/USD';
$mysql = new mysqli('localhost','ruslarjn_timer','BI7XqM*M0rYd','ruslarjn_timer');

// Ваш API ключ
$apiKey = 'e0c6921cbbf48c421b36e38c'; // Замените YOUR_API_KEY на ваш реальный ключ
$baseCurrency = 'RUB'; // Базовая валюта для обмена

// URL API
$url = "https://v6.exchangerate-api.com/v6/$apiKey/latest/$baseCurrency";

// Инициализация cURL
$ch = curl_init($url);

// Установка опций cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Возвращать результат как строку
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

// Выполнение запроса
$response = curl_exec($ch);

// Проверка на наличие ошибок
if (curl_errno($ch)) {
    echo 'Ошибка cURL: ' . curl_error($ch);
} else {
    // Преобразование JSON-ответа в массив
    $data = json_decode($response, true);

    // Проверка на наличие ошибок в ответе
    if (isset($data['error'])) {
        echo 'Ошибка API: ' . $data['error-type'];
    } else {
        foreach($data['conversion_rates'] as $key => $item){
            
            $sql = "SELECT name FROM `currency` WHERE `name`='$key' ";
            $sql_result = $mysql -> query($sql);
            $sql_result = $sql_result->fetch_object();
            if(!isset($sql_result)){
                $sql = "INSERT INTO `currency`  (`name`, `value`) VALUES ( '$key', '$item'); ";
            }else{
                $sql = "UPDATE `currency` SET `value` = '$item' WHERE `currency`.`name` = '$key'";
            }
            $mysql -> query($sql);
            //echo $sql.'</br>';
            
        }
    }
}

// Закрытие cURL
curl_close($ch);


?>