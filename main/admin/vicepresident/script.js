$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#vicepresident-menu").attr("href","#");
        $("#vicepresident-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getVicePresidentList();
getUserDetails();
var vicePresidentIdx;
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

function getVicePresidentList(){
    $.ajax({
		type: "POST",
		url: "get-vicepresident-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVicePresidentList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVicePresidentList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="vicepresident-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editVicePresident(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteVicePresident(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vicepresident-table-container").html(markUp);
    $("#vicepresident-table").DataTable();
}

function addVicePresident(){
    vicePresidentIdx = "";
    $("#add-edit-vicepresident-modal").modal("show");
    $("#add-edit-vicepresident-title").text("Add New Vice President");
    $("#add-edit-vicepresident-modal-error").text("");
}

function saveVicePresident(){
    var name = $("#vicepresident-name").val();
    var status = $("#vicepresident-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-vicepresident.php",
            dataType: 'html',
            data: {
                idx:vicePresidentIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-vicepresident-modal").modal("hide");
                    getVicePresidentList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-vicepresident-modal-error").text(error);
}

function editVicePresident(idx){
    vicePresidentIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-vicepresident-detail.php",
        dataType: 'html',
        data: {
            idx:vicePresidentIdx        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditVicePresident(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditVicePresident(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#vicepresident-name").val(list.name);
        $("#vicepresident-status").val(list.status);

        $("#add-edit-vicepresident-modal-title").text("Edit Vice President Details");
    })
    $("#add-edit-vicepresident-modal-error").text("");
    $("#add-edit-vicepresident-modal").modal("show");
}

function deleteVicePresident(idx){
    if(confirm("Are you sure you want to delete this Vice President?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-vicepresident.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getVicePresidentList();
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