$(document).ready(function() {
    setTimeout(function(){
        $("#system-setting-main-menu").addClass("menu-open");
        $("#system-setting-menu").addClass("active");
        $("#manage-respondent-menu").attr("href","#");
        $("#manage-respondent-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getRespondentList();
getBarangayList();
getUserDetails();
var respondentIdx;
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

function getRespondentList(){
    $.ajax({
		type: "POST",
		url: "get-respondent-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderRespondentList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderRespondentList(data){
    //alert(data);
    var lists = JSON.parse(data);
    var markUp = '<table id="respondent-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Barangay</th>\
                                <th>Purok</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var status = list.status;
        if(status == "processing"){
            status = '<span class="badge badge-warning">Processing</span>';
        }else if(status == "complete"){
            status = '<span class="badge badge-success">Complete</span>';
        }
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.barangay+'</td>\
                        <td>'+list.purok+'</td>\
                        <td>'+status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editRespondent(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteRespondent(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#respondent-table-container").html(markUp);
    $("#respondent-table").DataTable();
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
                        <label for="respondent-barangay" class="col-form-label">Barangay:</label>\
                        <select class="form-control" id="respondent-barangay" onchange="getPurokList()">';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#barangay-select-container").html(markUp);
    getPurokList();
}

function getPurokList(){
    var barangay = $("#respondent-barangay").val();
    $.ajax({
		type: "POST",
		url: "get-purok-list.php",
		dataType: 'html',
		data: {
			barangay:barangay
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
    var markUp = '<div class="form-group">\
                        <label for="respondent-purok" class="col-form-label">Purok:</label>\
                        <select class="form-control" id="respondent-purok">';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#purok-select-container").html(markUp);
}

function addRespondent(){
    respondentIdx = "";
    $("#add-edit-respondent-modal").modal("show");
    $("#add-edit-respondent-title").text("Add New Respondent");
    $("#add-edit-respondent-modal-error").text("");
    getPurokList();
}

function saveRespondent(){
    var name = $("#respondent-name").val();
    var barangay = $("#respondent-barangay").val();
    var purok = $("#respondent-purok").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else if(barangay == "" || barangay == undefined){
        error = "*Please select barangay!";
    }else if(purok == "" || purok == undefined){
        error = "*Please select purok!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-respondent.php",
            dataType: 'html',
            data: {
                idx:respondentIdx,
                name:name,
                barangay:barangay,
                purok:purok
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-respondent-modal").modal("hide");
                    getRespondentList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-respondent-modal-error").text(error);
}

function editRespondent(idx){
    respondentIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-respondent-detail.php",
        dataType: 'html',
        data: {
            idx:respondentIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditRespondent(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditRespondent(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#respondent-name").val(list.name);
        $("#respondent-barangay").val(list.barangay);
        getPurokList();
        $("#respondent-purok").val(list.purok);
    })
    $("#add-edit-respondent-modal-title").text("Edit Respondent Details");
    $("#add-edit-respondent-modal-error").text("");
    $("#add-edit-respondent-modal").modal("show");
}

function deleteRespondent(idx){
    if(confirm("Are you sure you want to delete this Respondent?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-respondent.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getRespondentList();
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