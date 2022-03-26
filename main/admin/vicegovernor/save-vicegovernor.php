<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveViceGovernor($idx,$name,$status){
        global $conn;
        $table = "vgov";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,status) VALUES ('$name','$status')";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET name='$name',status='$status' WHERE idx='$idx'";
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
        $status = sanitize($_POST["status"]);
        if(isset($name,$status)){
            echo saveViceGovernor($idx,$name,$status);
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