<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getClubName($idx){
            global $conn;
            $name = "";
            $table = "club";
            $sql = "SELECT name FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $name = $row["name"];
                }
            }
            return $name;
        }

        function getKuyaList($club){
            global $conn;
            $data = array();
            $table = "account";
            if($club == "all"){
                $sql = "SELECT * FROM `$table` WHERE status='active' AND access='member' ORDER by name";
            }else{
                $sql = "SELECT * FROM `$table` WHERE status='active' AND access='member' AND club='$club' ORDER by name";
            }
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> idx = $row["idx"];
                        $value -> name = $row["name"];
                        $value -> address = $row["address"];
                        $value -> contact = $row["contact"];
                        $value -> profession = $row["profession"];
                        $value -> club = getClubName($row["club"]);
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
            $club = sanitize($_POST["club"]);
            echo getKuyaList($club);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>