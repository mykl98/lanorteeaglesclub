<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveResp($idx,$press,$vPress,$sen1,$sen2,$sen3,$sen4,$sen5,$sen6,$sen7,$sen8,$sen9,$sen10,$sen11,$sen12,$rep,$gov,$vGov,$sang1,$sang2,$sang3,$sang4,$sang5,$mayor,$vMayor,$bayan1,$bayan2,$bayan3,$bayan4,$bayan5,$bayan6,$bayan7,$bayan8,$party){
        global $conn;
        $table = "respondent";
        $sql = "UPDATE `$table` SET press='$press',vpress='$vPress',sen1='$sen1',sen2='$sen2',sen3='$sen3',sen4='$sen4',sen5='$sen5',sen6='$sen6',sen7='$sen7',sen8='$sen8',sen9='$sen9',sen10='$sen10',sen11='$sen11',sen12='$sen12',rep='$rep',gov='$gov',vgov='$vGov',sang1='$sang1',sang2='$sang2',sang3='$sang3',sang4='$sang4',sang5='$sang5',mayor='$mayor',vmayor='$vMayor',bayan1='$bayan1',bayan2='$bayan2',bayan3='$bayan3',bayan4='$bayan4',bayan5='$bayan5',bayan6='$bayan6',bayan7='$bayan7',bayan8='$bayan8',party='$party',status='complete' WHERE idx='$idx'";
        if(mysqli_query($conn,$sql)){
            return "true*_*";
        }else{
            return "System Failed!";
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $press = sanitize($_POST["press"]);
        $vPress = sanitize($_POST["vpress"]);
        $sen1 = sanitize($_POST["sen1"]);
        $sen2 = sanitize($_POST["sen2"]);
        $sen3 = sanitize($_POST["sen3"]);
        $sen4 = sanitize($_POST["sen4"]);
        $sen5 = sanitize($_POST["sen5"]);
        $sen6 = sanitize($_POST["sen6"]);
        $sen7 = sanitize($_POST["sen7"]);
        $sen8 = sanitize($_POST["sen8"]);
        $sen9 = sanitize($_POST["sen9"]);
        $sen10 = sanitize($_POST["sen10"]);
        $sen11 = sanitize($_POST["sen11"]);
        $sen12 = sanitize($_POST["sen12"]);
        $rep = sanitize($_POST["rep"]);
        $gov = sanitize($_POST["gov"]);
        $vGov = sanitize($_POST["vgov"]);
        $sang1 = sanitize($_POST["sang1"]);
        $sang2 = sanitize($_POST["sang2"]);
        $sang3 = sanitize($_POST["sang3"]);
        $sang4 = sanitize($_POST["sang4"]);
        $sang5 = sanitize($_POST["sang5"]);
        $mayor = sanitize($_POST["mayor"]);
        $vMayor = sanitize($_POST["vmayor"]);
        $bayan1 = sanitize($_POST["bayan1"]);
        $bayan2 = sanitize($_POST["bayan2"]);
        $bayan3 = sanitize($_POST["bayan3"]);
        $bayan4 = sanitize($_POST["bayan4"]);
        $bayan5 = sanitize($_POST["bayan5"]);
        $bayan6 = sanitize($_POST["bayan6"]);
        $bayan7 = sanitize($_POST["bayan7"]);
        $bayan8 = sanitize($_POST["bayan8"]);
        $party = sanitize($_POST["party"]);
        if(!empty($idx) && !empty($press) && !empty($vPress) && !empty($sen1) && !empty($sen2) && !empty($sen3) && !empty($sen4) && !empty($sen5) && !empty($sen6) && !empty($sen7) && !empty($sen8) && !empty($sen9) && !empty($sen10) && !empty($sen11) && !empty($sen12) && !empty($rep) && !empty($gov) && !empty($vGov) && !empty($sang1) && !empty($sang2) && !empty($sang3) && !empty($sang4) && !empty($sang5) && !empty($mayor) && !empty($vMayor) && !empty($bayan1) && !empty($bayan2) && !empty($bayan3) && !empty($bayan4) && !empty($bayan5) && !empty($bayan6) && !empty($bayan7) && !empty($bayan8) && !empty($party)){
            echo saveResp($idx,$press,$vPress,$sen1,$sen2,$sen3,$sen4,$sen5,$sen6,$sen7,$sen8,$sen9,$sen10,$sen11,$sen12,$rep,$gov,$vGov,$sang1,$sang2,$sang3,$sang4,$sang5,$mayor,$vMayor,$bayan1,$bayan2,$bayan3,$bayan4,$bayan5,$bayan6,$bayan7,$bayan8,$party);
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