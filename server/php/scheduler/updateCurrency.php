<?php

//$req = 'https://v6.exchangerate-api.com/v6/e0c6921cbbf48c421b36e38c/latest/USD';
$mysql = new mysqli('localhost','ruslarjn_timer','BI7XqM*M0rYd','ruslarjn_timer');

// Ваш API ключ
$apiKey = 'a79019e376079d4eeaa5078ead0a27eb';//'713562e12866cf7e8686694048160b43'; // Замените YOUR_API_KEY на ваш реальный ключ
$baseCurrency = 'USD'; // Базовая валюта для обмена
$currencies = 'RUB,AED,AOA,AZN,BDT,BRL,CLP,CNY,CZK,DKK,EGP,EUR,GBP,GHS,HUF,IDR,ILS,INR,IQD,JOD,JPY,KES,KRW,KWD,LAK,LYD,MAD,MXN,MYR,MZN,NGN,NOK,NPR,OMR,PEN,PGK,PHP,PKR,RWF,SAR,SDG,SEK,SYP,THB,TND,TRY,TWD,TZS,UAH,UGX,USD,UZS,VND,XAF,XOF,YER,ZAR';

// URL API
$url = "http://apilayer.net/api/live?access_key=$apiKey&%20currencies=$currencies&%20source=$baseCurrency&%20format=1";
//echo $url.'</br>';
//$url = 'http://apilayer.net/api/live?access_key=a79019e376079d4eeaa5078ead0a27eb&%20currencies=RUB,%20AED,%20AOA,%20AZN,%20BDT,%20BRL,%20CLP,%20CNY,%20CZK,%20DKK,%20EGP,%20EUR,%20GBP,%20GHS,%20HUF,%20IDR,%20ILS,%20INR,%20IQD,%20JPY,%20KES,%20KRW,%20KWD,%20LAK,%20LYD,%20MAD,%20MXN,%20MYR,%20MZN,%20NGN,%20NOK,%20NPR,%20OMR,%20PEN,%20PGK,%20PHP,%20PKR,%20RWF,%20SAR,%20SDG,%20SEK,%20SYP,%20THB,%20TND,%20TRY,%20TWD,%20TZS,%20UAH,%20UGX,%20USD,%20UZS,%20VND,%20XAF,%20XOF,%20YER,%20ZAR&source=RUB&format=1';

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
        foreach($data['quotes'] as $key => $item){
            $key = str_replace('USD','', $key);
            //echo $key.' : '.$item.'</br>';
            $sql = "SELECT name FROM `currency` WHERE `name`='$key' ";
            $sql_result = $mysql -> query($sql);
            $sql_result = $sql_result->fetch_object();
            if(!isset($sql_result)){
                $sql = "INSERT INTO `currency`  (`name`, `value`) VALUES ( '$key', '$item'); ";
            }else{
                $sql = "UPDATE `currency` SET `value` = '$item' WHERE `currency`.`name` = '$key'";
            }
            $mysql -> query($sql);
            
        }
    }
}

// Закрытие cURL
curl_close($ch);


?>