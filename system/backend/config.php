<?php
$whitelist = array('127.0.0.1', "::1");

if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
    $servername = "localhost";
	$username = "u190094471_eagles";
	$password = "Skooltech_113012";
	$dbname = "u190094471_eagles";
	$conn = new mysqli($servername, $username, $password, $dbname);
	$baseUrl = "https://tfoenmr9.com";
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
?>