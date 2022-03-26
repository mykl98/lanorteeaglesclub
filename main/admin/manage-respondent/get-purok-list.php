<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getPurokList($barangay){
            global $conn;
            $data = array();
            $table = "purok";
            $sql = "SELECT * FROM `$table` WHERE barangay='$barangay' && status='active' ORDER by name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> idx = $row["idx"];
                        $value -> name = $row["name"];
                        array_push($data,$value);
                    }
                }
                $data = json_encode($data);
                return "true*_*".$data;
            }else{
                return "System Error!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $barangay = sanitize($_POST["barangay"]);
            echo getPurokList($barangay);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>