$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#vicegovernor-menu").attr("href","#");
        $("#vicegovernor-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getViceGovernorList();
getUserDetails();
var viceGovernorIdx;
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

function getViceGovernorList(){
    $.ajax({
		type: "POST",
		url: "get-vicegovernor-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderViceGovernorList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderViceGovernorList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="vicegovernor-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Status</th>\
                                <th style="max-width:40px;min-width:40px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editViceGovernor(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteViceGovernor(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vicegovernor-table-container").html(markUp);
    $("#vicegovernor-table").DataTable();
}

function addViceGovernor(){
    viceGovernorIdx = "";
    $("#add-edit-vicegovernor-modal").modal("show");
    $("#add-edit-vicegovernor-title").text("Add New Vice Governor");
    $("#add-edit-vicegovernor-modal-error").text("");
}

function saveViceGovernor(){
    var name = $("#vicegovernor-name").val();
    var status = $("#vicegovernor-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-vicegovernor.php",
            dataType: 'html',
            data: {
                idx:viceGovernorIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-vicegovernor-modal").modal("hide");
                    getViceGovernorList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-vicegovernor-modal-error").text(error);
}

function editViceGovernor(idx){
    viceGovernorIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-vicegovernor-detail.php",
        dataType: 'html',
        data: {
            idx:viceGovernorIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditViceGovernor(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditViceGovernor(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#vicegovernor-name").val(list.name);
        $("#vicegovernor-status").val(list.status);
    })
    $("#add-edit-vicegovernor-modal-title").text("Edit Vice Governor Details");
    $("#add-edit-vicegovernor-modal-error").text("");
    $("#add-edit-vicegovernor-modal").modal("show");
}

function deleteViceGovernor(idx){
    if(confirm("Are you sure you want to delete this Vice Governor?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-vicegovernor.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getViceGovernorList();
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