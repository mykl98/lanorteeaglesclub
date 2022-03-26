$(document).ready(function() {
    setTimeout(function(){
        $("#system-setting-main-menu").addClass("menu-open");
        $("#system-setting-menu").addClass("active");
        $("#manage-barangay-menu").attr("href","#");
        $("#manage-barangay-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getBarangayList();
getUserDetails();
var barangayIdx;
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
    var markUp = '<table id="barangay-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editBarangay(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteBarangay(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#barangay-table-container").html(markUp);
    $("#barangay-table").DataTable();
}

function addBarangay(){
    barangayIdx = "";
    $("#add-edit-barangay-modal").modal("show");
    $("#add-edit-barangay-title").text("Add New Barangay");
    $("#add-edit-barangay-modal-error").text("");
}

function saveBarangay(){
    var name = $("#barangay-name").val();
    var status = $("#barangay-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-barangay.php",
            dataType: 'html',
            data: {
                idx:barangayIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-barangay-modal").modal("hide");
                    getBarangayList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-barangay-modal-error").text(error);
}

function editBarangay(idx){
    barangayIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-barangay-detail.php",
        dataType: 'html',
        data: {
            idx:idx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditBarangay(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditBarangay(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#barangay-name").val(list.name);
        $("#barangay-status").val(list.status);

        $("#add-edit-barangay-modal-title").text("Edit Barangay Details");
    })
    $("#add-edit-barangay-modal-error").text("");
    $("#add-edit-barangay-modal").modal("show");
}

function deleteBarangay(idx){
    if(confirm("Are you sure you want to delete this Barangay?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-barangay.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getBarangayList();
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