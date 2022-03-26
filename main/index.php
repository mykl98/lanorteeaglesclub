<?php
include_once "../system/backend/config.php";
    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $loginIdx = $_SESSION["loginidx"];
        
        $table = "account";
        $sql = "SELECT * FROM `$table` WHERE idx='$loginIdx'";
        if($result=mysqli_query($conn,$sql)){
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_array($result);
                $access = $row["access"];
                $_SESSION["access"] = $access;
                header("location:" .$access. "/dashboard");
            }else{
                session_destroy();
                header("location:../index.php");
                exit();
            }
        }else{
            echo "System Error!";
        }
    }else{
        session_destroy();
        header("location:../index.php");
        exit();
    }
?>