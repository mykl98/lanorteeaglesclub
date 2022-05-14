$(document).ready(function() {
    setTimeout(function(){
        $("#manage-member-menu").attr("href","#");
        $("#manage-member-menu").addClass("active");
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

getMemberList();
getUserDetails();
var memberIdx;
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

function getMemberList(){
    $.ajax({
		type: "POST",
		url: "get-member-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderMemberList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderMemberList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="member-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Address</th>\
                                <th>Contact Number</th>\
                                <th>Profession</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.address+'</td>\
                        <td>'+list.contact+'</td>\
                        <td>'+list.profession+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editMember(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteMember(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#member-table-container").html(markUp);
    $("#member-table").DataTable();
}

function addMember(){
    memberIdx = "";
    $("#add-edit-member-modal").modal("show");
    $("#add-edit-member-modal-error").text("");
}

function saveMember(){
    var name = $("#member-name").val();
    var address = $("#member-address").val();
    var contact = $("#member-contact").val();
    var profession = $("#member-profession").val();
    var status = $("#member-status").val();
    var error = "";

    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else if(address == "" || address == undefined){
        error = "*Address field should not be empty.";
    }else if(contact == "" || contact == undefined){
        error = "*Contact Number field should not be empty!";
    }else if(profession == "" || profession == undefined){
        error = "*Profession field should not be empty!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-member.php",
            dataType: 'html',
            data: {
                idx:memberIdx,
                name:name,
                address:address,
                contact:contact,
                profession:profession,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-member-modal").modal("hide");
                    getMemberList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-member-modal-error").text(error);
}

function editMember(idx){
    memberIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-member-detail.php",
        dataType: 'html',
        data: {
            idx:memberIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditMember(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditMember(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        $("#member-name").val(list.name);
        $("#member-address").val(list.address);
        $("#member-contact").val(list.contact);
        $("#member-profession").val(list.profession);
        $("#member-username").val(list.username);
        $("#member-status").val(list.status);   
    })
    $("#add-edit-member-modal-title").text("Edit Member Details");
    $("#add-edit-member-modal-error").text("");
    $("#add-edit-member-modal").modal("show");
}

function deleteMember(idx){
    if(confirm("Are you sure you want to delete this Member?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-member.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getMemberList();
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