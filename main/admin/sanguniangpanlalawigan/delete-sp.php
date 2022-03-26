<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function deleteSanguniangPanlalawigan($idx){
            global $conn;
            $table = "sang";
            $sql = "DELETE FROM `$table` WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            echo deleteSanguniangPanlalawigan($idx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>