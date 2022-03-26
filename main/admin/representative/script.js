$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#representative-menu").attr("href","#");
        $("#representative-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getRepresentativeList();
getUserDetails();
var representativeIdx;
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

function getRepresentativeList(){
    $.ajax({
		type: "POST",
		url: "get-representative-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderRepresentativeList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderRepresentativeList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="representative-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editRepresentative(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteRepresentative(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#representative-table-container").html(markUp);
    $("#representative-table").DataTable();
}

function addRepresentative(){
    representativeIdx = "";
    $("#add-edit-representative-modal").modal("show");
    $("#add-edit-representative-title").text("Add New Representative");
    $("#add-edit-representative-modal-error").text("");
}

function saveRepresentative(){
    var name = $("#representative-name").val();
    var status = $("#representative-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-representative.php",
            dataType: 'html',
            data: {
                idx:representativeIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-representative-modal").modal("hide");
                    getRepresentativeList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-representative-modal-error").text(error);
}

function editRepresentative(idx){
    representativeIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-representative-detail.php",
        dataType: 'html',
        data: {
            idx:representativeIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditRepresentative(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditRepresentative(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#representative-name").val(list.name);
        $("#representative-status").val(list.status);

        $("#add-edit-representative-modal-title").text("Edit Representative Details");
    })
    $("#add-edit-representative-modal-error").text("");
    $("#add-edit-representative-modal").modal("show");
}

function deleteRepresentative(idx){
    if(confirm("Are you sure you want to delete this Representative?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-representative.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getRepresentativeList();
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