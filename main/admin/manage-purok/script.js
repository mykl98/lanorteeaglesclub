$(document).ready(function() {
    setTimeout(function(){
        $("#system-setting-main-menu").addClass("menu-open");
        $("#system-setting-menu").addClass("active");
        $("#manage-purok-menu").attr("href","#");
        $("#manage-purok-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getPurokList();
getBarangayList();
getUserDetails();
var purokIdx;
var baseUrl = $("#base-url").text();

function getUserDetails(){
    $.ajax({
        type: "POST",
        url: "get-profile-settings.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderUserDetails(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderUserDetails(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        if(list.image != ""){
            $("#global-user-image").attr("src", list.image);
        }
        $("#global-user-name").text(list.name);
    })

}

function getPurokList(){
    $.ajax({
		type: "POST",
		url: "get-purok-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderPurokList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderPurokList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="purok-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Barangay</th>\
                                <th>Status</th>\
                                <th style="max-width:40px;min-width:40px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.barangay+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editPurok(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deletePurok(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#purok-table-container").html(markUp);
    $("#purok-table").DataTable();
}

function getBarangayList(){
    $.ajax({
		type: "POST",
		url: "get-barangay-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderBarangayList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderBarangayList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group">\
                        <label for="purok-barangay" class="col-form-label">Barangay:</label>\
                        <select class="form-control" id="purok-barangay">';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#barangay-select-container").html(markUp);
}

function addPurok(){
    purokIdx = "";
    $("#add-edit-purok-modal").modal("show");
    $("#add-edit-purok-title").text("Add New Purok");
    $("#add-edit-purok-modal-error").text("");
}

function savePurok(){
    var name = $("#purok-name").val();
    var barangay = $("#purok-barangay").val();
    var status = $("#purok-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else if(barangay == "" || barangay == undefined){
        error = "*Please select barangay!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-purok.php",
            dataType: 'html',
            data: {
                idx:purokIdx,
                barangay:barangay,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-purok-modal").modal("hide");
                    getPurokList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-purok-modal-error").text(error);
}

function editPurok(idx){
    purokIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-purok-detail.php",
        dataType: 'html',
        data: {
            idx:purokIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditPurok(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditPurok(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#purok-name").val(list.name);
        $("#purok-barangay").val(list.barangay);
        $("#purok-status").val(list.status);
    })
    $("#add-edit-purok-modal-title").text("Edit Purok Details");
    $("#add-edit-purok-modal-error").text("");
    $("#add-edit-purok-modal").modal("show");
}

function deletePurok(idx){
    if(confirm("Are you sure you want to delete this Purok?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-purok.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getPurokList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

function logout(){
    $.ajax({
        type: "POST",
        url: "logout.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                window.open(baseUrl + "/index.php","_self")
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}