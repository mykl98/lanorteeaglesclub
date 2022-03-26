<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveRespondent($idx,$name,$barangay,$purok){
        global $conn;
        $table = "respondent";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,barangay,purok,status) VALUES ('$name','$barangay','$purok','processing')";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET name='$name',barangay='$barangay',purok='$purok' WHERE idx='$idx'";
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
        $purok = sanitize($_POST["purok"]);

        if(isset($name,$barangay,$purok)){
            echo saveRespondent($idx,$name,$barangay,$purok);
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