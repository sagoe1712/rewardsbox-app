<?php

$url = 'http://rewardsboxnigeria.com/rewardsbox/api/v1/?api=bills_purchase';
//$passcode = $_POST['passcode'];
//$token = $_POST['token'];
$token = 1000;
$signature = $_POST['signature'];
$price = $_POST['price'];
//$customer_id = $_POST['customer_id'];
$email = $_POST['email'];
$phone_no = $_POST['phone_no'];


//$token ="7e23ab97ec2c68e46f315bf37d2b5177";

$fields = array(
    signature => $signature,
price => $price,
customer_id => $customer_id,
email => $email,
phone_no => $phone_no


);

$field_string = $fields;


$ch = curl_init();
$timeout = 30;
curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($field_string));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type= application/json"));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('token:'.$token));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$result = curl_exec($ch);
curl_close($ch);


$response = json_decode($result, true);

echo $result;

?>