<?php
$whitelist = array('127.0.0.1', "::1");

if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
    $servername = "localhost";
	$username = "u190094471_eagles";
	$password = "Skooltech_113012";
	$dbname = "u190094471_eagles";
	$conn = new mysqli($servername, $username, $password, $dbname);
	$baseUrl = "https://tfoenmr9.com/main";
}else{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "eagles";
	$conn = new mysqli($servername, $username, $password, $dbname);
	$baseUrl = "http://localhost/lanorteeaglesclub";
}

date_default_timezone_set("Asia/Manila");

function sanitize($input){
	global $conn;
	$output = mysqli_real_escape_string($conn, $input);
	return $output;
}

function saveLog($log){
	$logFile = fopen("log.txt", "a") or die("Unable to open file!");
	$timeStamp = date("Y-m-d") . '-' . date("h:i:sa");
	fwrite($logFile, $timeStamp .' Log: '. $log . "\n");
	fclose($logFile);
}

function systemLog($log){
	global $conn;
	date_default_timezone_set("Asia/Manila");
    $date = date("y-m-d");
	$time = date("h:i:sa");
	$department = $_SESSION["department"];
	$account = $_SESSION["loginidx"];
	$table = "system-log";
	$sql = "INSERT INTO `$table` (date,time,log,department,account) VALUES ('$date','$time','$log','$department','$account')";
	mysqli_query($conn,$sql);
}

function generateCode($length){
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

$shortCode = "23737526";
$passPhrase = "slQ2p8hokq";
$appId = "z5xjHEeRb8tBgin5BMcR6gtEa58oHGXX";
$appSecret = "810df2bbe3d25bfe2e8dd9ef64d85798231b9134e92f252b974ed1bdc60242f1";

function sendMessage($number,$message){
	global $conn,$shortCode,$passPhrase,$appId,$appSecret;
	$url = "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/".$shortCode."/requests?passphrase=".$passPhrase."&app_id=".$appId."&app_secret=".$appSecret;
	$dataArray = [
		'outboundSMSMessageRequest' => [
			'clientCorrelator' => $number,
			'outboundSMSTextMessage' => ['message' => rawurldecode(rawurldecode($message))],
			'address' => $number
		]
	];
	$json_data = json_encode($dataArray);

	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($curl, CURLOPT_POSTFIELDS, $json_data);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($json_data))
	);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		return "false";
	} else {
		return "true";
	}
}
?>