$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#mayor-menu").attr("href","#");
        $("#mayor-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getMayorList();
getUserDetails();
var mayorIdx;
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

function getMayorList(){
    $.ajax({
		type: "POST",
		url: "get-mayor-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderMayorList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderMayorList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="mayor-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editMayor(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteMayor(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#mayor-table-container").html(markUp);
    $("#mayor-table").DataTable();
}

function addMayor(){
    mayorIdx = "";
    $("#add-edit-mayor-modal").modal("show");
    $("#add-edit-mayor-title").text("Add New Mayor");
    $("#add-edit-mayor-modal-error").text("");
}

function saveMayor(){
    var name = $("#mayor-name").val();
    var status = $("#mayor-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-mayor.php",
            dataType: 'html',
            data: {
                idx:mayorIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-mayor-modal").modal("hide");
                    getMayorList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-mayor-modal-error").text(error);
}

function editMayor(idx){
    mayorIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-mayor-detail.php",
        dataType: 'html',
        data: {
            idx:mayorIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditMayor(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditMayor(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#mayor-name").val(list.name);
        $("#mayor-status").val(list.status);
    })
    $("#add-edit-mayor-modal-title").text("Edit Mayor Details");
    $("#add-edit-mayor-modal-error").text("");
    $("#add-edit-mayor-modal").modal("show");
}

function deleteMayor(idx){
    if(confirm("Are you sure you want to delete this Mayor?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-mayor.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getMayorList();
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