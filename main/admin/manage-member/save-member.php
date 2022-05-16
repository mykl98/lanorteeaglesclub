<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveMember($idx,$name,$address,$contact,$profession,$status,$club){
        global $conn;
        $table = "account";
        if($idx == ""){
            $userPass = generateCode(6);
            $sql = "INSERT INTO `$table` (name,club,username,password,access,status,address,contact,profession) VALUES ('$name','$club','$userPass','123456','member','$status','$address','$contact','$profession')";
        }else{
            $sql = "UPDATE `$table` SET name='$name',address='$address',contact='$contact',profession='$profession',status='$status' WHERE idx='$idx'"; 
        }
        if(mysqli_query($conn,$sql)){
            return "true*_*";
        }else{
            return "System Error!";
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $name = sanitize($_POST["name"]);
        $address = sanitize($_POST["address"]);
        $contact = sanitize($_POST["contact"]);
        $profession = sanitize($_POST["profession"]);
        $club = sanitize($_POST["club"]);
        $status = sanitize($_POST["status"]);
        if(!empty($name)&&!empty($address)&&!empty($contact)&&!empty($profession)&&!empty($status)){
            echo saveMember($idx,$name,$address,$contact,$profession,$status,$club);
        }else{
            echo "Network Error!";
        }
    }else{
        echo "Access Denied!";
    }
}else{
    echo "Access Denied!";
}
?>