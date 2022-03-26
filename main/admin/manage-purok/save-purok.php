<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function savePurok($idx,$name,$barangay,$status){
        global $conn;
        $table = "purok";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,barangay,status) VALUES ('$name','$barangay','$status')";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET name='$name',barangay='$barangay',status='$status' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $name = sanitize($_POST["name"]);
        $barangay = sanitize($_POST["barangay"]);
        $status = sanitize($_POST["status"]);

        if(isset($name,$status)){
            echo savePurok($idx,$name,$barangay,$status);
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