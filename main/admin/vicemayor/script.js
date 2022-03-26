$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#vicemayor-menu").attr("href","#");
        $("#vicemayor-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getViceMayorList();
getUserDetails();
var viceMayorIdx;
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

function getViceMayorList(){
    $.ajax({
		type: "POST",
		url: "get-vicemayor-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderViceMayorList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderViceMayorList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="vicemayor-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editViceMayor(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteViceMayor(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vicemayor-table-container").html(markUp);
    $("#vicemayor-table").DataTable();
}

function addViceMayor(){
    viceMayorIdx = "";
    $("#add-edit-vicemayor-modal").modal("show");
    $("#add-edit-vicemayor-title").text("Add New Vice Mayor");
    $("#add-edit-vicemayor-modal-error").text("");
}

function saveViceMayor(){
    var name = $("#vicemayor-name").val();
    var status = $("#vicemayor-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-vicemayor.php",
            dataType: 'html',
            data: {
                idx:viceMayorIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-vicemayor-modal").modal("hide");
                    getViceMayorList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-vicemayor-modal-error").text(error);
}

function editViceMayor(idx){
    viceMayorIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-vicemayor-detail.php",
        dataType: 'html',
        data: {
            idx:viceMayorIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditViceMayor(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditViceMayor(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#vicemayor-name").val(list.name);
        $("#vicemayor-status").val(list.status);
    })
    $("#add-edit-vicemayor-modal-title").text("Edit Vice Mayor Details");
    $("#add-edit-vicemayor-modal-error").text("");
    $("#add-edit-vicemayor-modal").modal("show");
}

function deleteViceMayor(idx){
    if(confirm("Are you sure you want to delete this Vice Mayor?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-vicemayor.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getViceMayorList();
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