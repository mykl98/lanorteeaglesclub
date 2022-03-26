<?php
    include_once "../../../system/backend/config.php";
    session_start();
    $idx = $_SESSION["loginidx"];

    if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
    
    }else{
        session_destroy();
        header("location:".$baseUrl."/index.php");
        exit();
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin | Manage Survey Respondent</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/fontawesome/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/fontawesome/css/fontawesome.css">
    <!--Bootstrap CSS-->
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/bootstrap/css/bootstrap.min.css">
    <!--Datatable-->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/datatables/css/dataTables.bootstrap4.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/adminlte/css/adminlte.min.css">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/overlayScrollbars/css/OverlayScrollbars.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="<?php echo $baseUrl;?>/system/plugin/googlefont/css/googlefont.min.css" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
        <!-- Top Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <p id="global-user-name" class="mr-2 mt-2">Michael Martin G. Abellana</p>
                    <p id="base-url" class="d-none"><?php echo $baseUrl;?></p>
                </li>
                <li class="nav-item">
                    <a class="" data-toggle="dropdown" href="#">
                        <img id="global-user-image" class="rounded-circle" src="<?php echo $baseUrl;?>/system/images/blank-profile.png" width="40px" height="40px">
                    </a>
                    <div class="dropdown-menu dropdown-menu-right mt-13" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="../profile-setting"><i class="fa fa-user pr-2"></i> Profile</a>
                            <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" onclick="$('#logout-modal').modal('show');"><i class="fa fa-power-off pr-2"></i> Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /Top Navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="#" class="brand-link text-center pb-0">
                <img id="global-client-logo" src="<?php echo $baseUrl;?>/system/images/logo.png" class="rounded-circle" width="100px">
                <p id="global-department-name" class="">Admin</p>
            </a>

            <?php include "../side-nav-bar.html"?>
        </aside>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Manage Survey Respondent</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Manage Candidates</a></li>
                                <li class="breadcrumb-item active">Manage Survey Respondent</li>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div><!-- /.content-header -->
            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div id="resp-table-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section><!-- /.content -->
        </div><!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2021 <a href="#">SkoolTech Solutions</a>.</strong>
                All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.0.4
            </div>
        </footer>
    </div>
    <!-- ./wrapper -->

    <!-- Modals -->
    <div class="modal fade" id="edit-resp-modal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="edit-resp-modal-title">Respondent Survey</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-sm" id="resp-name" readonly>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-sm" id="resp-barangay" readonly>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-sm" id="resp-purok" readonly>
                                </div>
                                <div id="press-select-container"></div>
                                <div id="vpress-select-container"></div>
                                <div id="party-select-container"></div>
                                <div id="rep-select-container"></div>
                            </div>
                            <div class="col">
                                <div id="gov-select-container"></div>
                                <div id="vgov-select-container"></div>
                                <div id="mayor-select-container"></div>
                                <div id="vmayor-select-container"></div>
                            </div>
                            <div class="col">
                                <div class="border border-primary p-2">
                                    <label class="col-form-label">Senator:</label>
                                    <div id="sen1-select-container"></div>
                                    <div id="sen2-select-container"></div>
                                    <div id="sen3-select-container"></div>
                                    <div id="sen4-select-container"></div>
                                    <div id="sen5-select-container"></div>
                                    <div id="sen6-select-container"></div>
                                    <div id="sen7-select-container"></div>
                                    <div id="sen8-select-container"></div>
                                    <div id="sen9-select-container"></div>
                                    <div id="sen10-select-container"></div>
                                    <div id="sen11-select-container"></div>
                                    <div id="sen12-select-container"></div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="border border-primary p-2">
                                    <label class="col-form-label">Sanguniang Panlalawigan:</label>
                                    <div id="sp1-select-container"></div>
                                    <div id="sp2-select-container"></div>
                                    <div id="sp3-select-container"></div>
                                    <div id="sp4-select-container"></div>
                                    <div id="sp5-select-container"></div>
                                </div>
                                <div class="border border-primary p-2 mt-3">
                                    <label class="col-form-label">Sanguniang Bayan:</label>
                                    <div id="sb1-select-container"></div>
                                    <div id="sb2-select-container"></div>
                                    <div id="sb3-select-container"></div>
                                    <div id="sb4-select-container"></div>
                                    <div id="sb5-select-container"></div>
                                    <div id="sb6-select-container"></div>
                                    <div id="sb7-select-container"></div>
                                    <div id="sb8-select-container"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <p id="edit-resp-modal-error" class="text-danger font-italic small"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="saveResp()">Save</button>
                </div>
            </div>
        </div>
    </div>


<!-- Logout Modal -->
    <div class="modal fade" id="logout-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-secondary"><strong>Logout</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Do you want to logout?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="logout()">Yes</button>
                </div>
            </div>
        </div>
    </div>

<!-- jQuery -->
<script src="<?php echo $baseUrl;?>/system/plugin/jquery/js/jquery.min.js"></script>
<script src="<?php echo $baseUrl;?>/system/plugin/jquery/js/jquery.dataTables.min.js"></script>
<!--Popper JS-->
<script src="<?php echo $baseUrl;?>/system/plugin/popper/js/popper.min.js"></script>
<!--Bootstrap-->
<script src="<?php echo $baseUrl;?>/system/plugin/bootstrap/js/bootstrap.min.js"></script>
<!-- Admin LTE -->
<script src="<?php echo $baseUrl;?>/system/plugin/adminlte/js/adminlte.js"></script>
<!-- overlayScrollbars -->
<script src="<?php echo $baseUrl;?>/system/plugin/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!--Datatables-->
<script src="<?php echo $baseUrl;?>/system/plugin/datatables/js/dataTables.bootstrap4.min.js"></script>

<!-- Page Level Script -->
<script src="script.js"></script>
</body>
</html>
