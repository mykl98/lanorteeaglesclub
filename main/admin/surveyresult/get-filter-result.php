<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getPresidentVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE press='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getPresidentResult(){
            global $conn;
            $data = array();
            $table = "press";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getPresidentVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getVPresidentVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE vpress='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getVPresidentResult(){
            global $conn;
            $data = array();
            $table = "vpress";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getVPresidentVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getSenatorVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE sen1='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen2='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen3='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen4='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen5='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen6='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen7='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen8='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen9='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen10='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen11='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sen12='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getSenatorResult(){
            global $conn;
            $data = array();
            $table = "sen";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getSenatorVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getRepVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE rep='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getRepResult(){
            global $conn;
            $data = array();
            $table = "rep";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getRepVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getGovVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE gov='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getGovResult(){
            global $conn;
            $data = array();
            $table = "gov";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getGovVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getVGovVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE vgov='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getVGovResult(){
            global $conn;
            $data = array();
            $table = "vgov";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getVGovVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getSPVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE sang1='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sang2='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sang3='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sang4='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE sang5='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getSPResult(){
            global $conn;
            $data = array();
            $table = "sang";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getSPVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getMayorVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE mayor='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getMayorResult(){
            global $conn;
            $data = array();
            $table = "mayor";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getMayorVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getVMayorVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE vmayor='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getVMayorResult(){
            global $conn;
            $data = array();
            $table = "vmayor";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getVMayorVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getSBVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE bayan1='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan2='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan3='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan4='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan5='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan6='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan7='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            $sql = "SELECT idx FROM `$table` WHERE bayan8='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote += mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getSBResult(){
            global $conn;
            $data = array();
            $table = "bayan";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getSBVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        function getPartyVote($idx){
            global $conn;
            $vote = 0;
            $table = "respondent";
            $sql = "SELECT idx FROM `$table` WHERE party='$idx'";
            if($result=mysqli_query($conn,$sql)){
                $vote = mysqli_num_rows($result);
            }
            return $vote;
        }
        
        function getPartyResult(){
            global $conn;
            $data = array();
            $table = "party";
            $sql = "SELECT idx,name FROM `$table` ORDER BY name";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> name = $row["name"];
                        $value -> vote = getPartyVote($row["idx"]);
                        array_push($data,$value);
                    }
                }
            }
            $data = json_encode($data);
            return "true*_*" . $data;
        }


        function getFilterResult($filter){
            if($filter == "press"){
                return getPresidentResult();
            }else if($filter == "vpress"){
                return getVPresidentResult();
            }else if($filter == "sen"){
                return getSenatorResult();
            }else if($filter == "rep"){
                return getRepResult();
            }else if($filter == "gov"){
                return getGovResult();
            }else if($filter == "vgov"){
                return getVGovResult();
            }else if($filter == "sp"){
                return getSPResult();
            }else if($filter == "mayor"){
                return getMayorResult();
            }else if($filter == "vmayor"){
                return getVMayorResult();
            }else if($filter == "sb"){
                return getSBResult();
            }else if($filter == "party"){
                return getPartyResult();
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $filter = sanitize($_POST["filter"]);
            echo getFilterResult($filter);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>