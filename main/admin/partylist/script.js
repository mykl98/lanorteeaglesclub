$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#partylist-menu").attr("href","#");
        $("#partylist-menu").addClass("active");
    },100)
})

$(document).on('shown.lte.pushmenu', function(){
    $("#global-department-name").show();
    $("#global-client-logo").attr("width","100px");
})

$(document).on('collapsed.lte.pushmenu', function(){
    $("#global-department-name").hide();
    $("#global-client-logo").attr("width","40px");
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getPLList();
getUserDetails();
var plIdx;
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

function getPLList(){
    $.ajax({
		type: "POST",
		url: "get-pl-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderPLList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderPLList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="pl-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editPL(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deletePL(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#pl-table-container").html(markUp);
    $("#pl-table").DataTable();
}

function addPL(){
    plIdx = "";
    $("#add-edit-pl-modal").modal("show");
    $("#add-edit-pl-title").text("Add New Partylist");
    $("#add-edit-pl-modal-error").text("");
}

function savePL(){
    var name = $("#pl-name").val();
    var status = $("#pl-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-pl.php",
            dataType: 'html',
            data: {
                idx:plIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-pl-modal").modal("hide");
                    getPLList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-pl-modal-error").text(error);
}

function editPL(idx){
    plIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-pl-detail.php",
        dataType: 'html',
        data: {
            idx:plIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditPL(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditPL(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#pl-name").val(list.name);
        $("#pl-status").val(list.status);
    })
    $("#add-edit-pl-modal-title").text("Edit Partylist Details");
    $("#add-edit-pl-modal-error").text("");
    $("#add-edit-pl-modal").modal("show");
}

function deletePL(idx){
    if(confirm("Are you sure you want to delete this Partylist?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-pl.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getPLList();
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