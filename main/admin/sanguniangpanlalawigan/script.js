$(document).ready(function() {
    setTimeout(function(){
        $("#manage-candidate-main-menu").addClass("menu-open");
        $("#manage-candidate-menu").addClass("active");
        $("#sanguniangpanlalawigan-menu").attr("href","#");
        $("#sanguniangpanlalawigan-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getSPList();
getUserDetails();
var spIdx;
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

function getSPList(){
    $.ajax({
		type: "POST",
		url: "get-sp-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderSPList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderSPList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="sp-table" class="table table-striped table-bordered table-sm">\
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
                            <button class="btn btn-success btn-sm" onclick="editSP(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteSP(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#sp-table-container").html(markUp);
    $("#sp-table").DataTable();
}

function addSP(){
    spIdx = "";
    $("#add-edit-sp-modal").modal("show");
    $("#add-edit-sp-title").text("Add New SP Member");
    $("#add-edit-sp-modal-error").text("");
}

function saveSP(){
    var name = $("#sp-name").val();
    var status = $("#sp-status").val();
    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-sp.php",
            dataType: 'html',
            data: {
                idx:spIdx,
                name:name,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-sp-modal").modal("hide");
                    getSPList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-sp-modal-error").text(error);
}

function editSP(idx){
    spIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-sp-detail.php",
        dataType: 'html',
        data: {
            idx:spIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditSP(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditSP(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#sp-name").val(list.name);
        $("#sp-status").val(list.status);
    })
    $("#add-edit-sp-modal-title").text("Edit SP Member Details");
    $("#add-edit-sp-modal-error").text("");
    $("#add-edit-sp-modal").modal("show");
}

function deleteSP(idx){
    if(confirm("Are you sure you want to delete this SP Member?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-sp.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getSPList();
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