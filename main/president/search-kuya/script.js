$(document).ready(function() {
    setTimeout(function(){
        $("#searchkuya-menu").attr("href","#");
        $("#searchkuya-menu").addClass("active");
    },100)
});

$(document).on('shown.lte.pushmenu', function(){
    $("#global-department-name").show();
    $("#global-client-logo").attr("width","100px");
})

$(document).on('collapsed.lte.pushmenu', function(){
    $("#global-department-name").hide();
    $("#global-client-logo").attr("width","40px");
})

getUserDetails();
getClubList();

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

function getClubList(){
    $.ajax({
        type: "POST",
        url: "get-club-list.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderClubList(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderClubList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="input-group input-group-sm w-25 float-left">\
                    <div class="input-group-prepend">\
                        <span class="input-group-text bg-success">Club Filter</span>\
                    </div>\
                    <select class="form-control" id="club-filter-select" onchange="clubFilterChange()">\
                        <option value="all">ALL</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#club-filter-container").html(markUp);
    clubFilterChange();
}

function clubFilterChange(){
    var filter = $("#club-filter-select").val();
    getKuyaList(filter);
}

function getKuyaList(club){
    $.ajax({
		type: "POST",
		url: "get-kuya-list.php",
		dataType: 'html',
		data: {
			club:club
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderKuyaList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderKuyaList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="kuya-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Address</th>\
                                <th>Contact Number</th>\
                                <th>Profession</th>\
                                <th>Club</th>\
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
                        <td>'+list.club+'</td>\
                        <td>\
                            <button class="btn btn-info btn-sm" onclick="viewKuya(\''+ list.idx +'\')"><i class="fa fa-eye"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#kuya-table-container").html(markUp);
    $("#kuya-table").DataTable();
}

function viewKuya(idx){
    $.ajax({
		type: "POST",
		url: "get-kuya-list.php",
		dataType: 'html',
		data: {
			club:club
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderViewKuya(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderViewKuya(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        if(list.image != ""){
            $('#kuya-image').attr("src",list.image);
        }
        $("#kuya-name").val(list.name);
        $("#kuya-address").val(list.address);
        $("#kuya-contact").val(list.contact);
        $("#kuya-club").val(list.club);
    })
    $("#view-kuya-modal").modal("show");
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
