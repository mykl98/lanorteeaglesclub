<?php
    if($_POST){
        include_once "../../../system/backend/config.php";
        function getBarangayName($idx){
            global $conn;
            $name = "";
            $table = "barangay";
            $sql = "SELECT name FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $name = $row["name"];
                }
            }
            return $name;
        }

        function getPurokName($idx){
            global $conn;
            $name = "";
            $table = "purok";
            $sql = "SELECT name FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $name = $row["name"];
                }
            }
            return $name;
        }

        function getRespDetail($idx){
            global $conn;
            $data = array();
            $table = "respondent";
            $sql = "SELECT * FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $value = new \StdClass();
                    $value -> idx = $row["idx"];
                    $value -> name = $row["name"];
                    $value -> barangay = getBarangayName($row["barangay"]);
                    $value -> purok = getPurokName($row["purok"]);
                    $value -> press = $row["press"];
                    $value -> vpress = $row["vpress"];
                    $value -> sen1 = $row["sen1"];
                    $value -> sen2 = $row["sen2"];
                    $value -> sen3 = $row["sen3"];
                    $value -> sen4 = $row["sen4"];
                    $value -> sen5 = $row["sen5"];
                    $value -> sen6 = $row["sen6"];
                    $value -> sen7 = $row["sen7"];
                    $value -> sen8 = $row["sen8"];
                    $value -> sen9 = $row["sen9"];
                    $value -> sen10 = $row["sen10"];
                    $value -> sen11 = $row["sen11"];
                    $value -> sen12 = $row["sen12"];
                    $value -> rep = $row["rep"];
                    $value -> gov = $row["gov"];
                    $value -> vgov = $row["vgov"];
                    $value -> sang1 = $row["sang1"];
                    $value -> sang2 = $row["sang2"];
                    $value -> sang3 = $row["sang3"];
                    $value -> sang4 = $row["sang4"];
                    $value -> sang5 = $row["sang5"];
                    $value -> mayor = $row["mayor"];
                    $value -> vmayor = $row["vmayor"];
                    $value -> bayan1 = $row["bayan1"];
                    $value -> bayan2 = $row["bayan2"];
                    $value -> bayan3 = $row["bayan3"];
                    $value -> bayan4 = $row["bayan4"];
                    $value -> bayan5 = $row["bayan5"];
                    $value -> bayan6 = $row["bayan6"];
                    $value -> bayan7 = $row["bayan7"];
                    $value -> bayan8 = $row["bayan8"];
                    $value -> party = $row["party"];
                    array_push($data,$value);
                }
                $data = json_encode($data);
                return "true*_*" . $data;
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            echo getRespDetail($idx);
        }else{
            echo "Access Denied";
        }
    }else{
        echo "Access Denied!";
    }
?>