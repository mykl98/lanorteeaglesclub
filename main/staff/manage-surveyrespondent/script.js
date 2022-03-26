$(document).ready(function() {
    setTimeout(function(){
        $("#manage-surveyrespondent-menu").attr("href","#");
        $("#manage-surveyrespondent-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

$(document).on('shown.lte.pushmenu', function(){
    $("#global-department-name").show();
    $("#global-client-logo").attr("width","100px");
})

$(document).on('collapsed.lte.pushmenu', function(){
    $("#global-department-name").hide();
    $("#global-client-logo").attr("width","40px");
})

getRespList();
getUserDetails();
getPressList();
getVPressList();
getPartyList();
getMayorList();
getVMayorList();
getSenatorList();
getRepList();
getGovList();
getVGovList();
getSPList();
getSBList();
var respIdx;
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

function getRespList(){
    $.ajax({
		type: "POST",
		url: "get-resp-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderRespList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderRespList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="resp-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Barangay</th>\
                                <th>Purok</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var status = list.status;
        var button = "";
        if(status == "processing"){
            status = '<span class="badge badge-warning">Processing</span>';
            button = '<button class="btn btn-success btn-sm" onclick="editResp(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>';
        }else if(status == "complete"){
            status = '<span class="badge badge-success">Complete</span>';
        }
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.barangay+'</td>\
                        <td>'+list.purok+'</td>\
                        <td>'+status+'</td>\
                        <td>\
                            '+button+'\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#resp-table-container").html(markUp);
    $("#resp-table").DataTable();
}

function getPressList(){
    $.ajax({
		type: "POST",
		url: "get-press-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderPressList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderPressList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-press" class="col-form-label">President:</label>\
                    <select class="form-control form-control-sm" id="resp-press">\
                        <option value="">SELECT PRESIDENT</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#press-select-container").html(markUp);
}

function getVPressList(){
    $.ajax({
		type: "POST",
		url: "get-vpress-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVPressList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVPressList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-vpress" class="col-form-label">Vice President:</label>\
                    <select class="form-control form-control-sm" id="resp-vpress">\
                        <option value="">SELECT VICE PRESIDENT</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#vpress-select-container").html(markUp);
}

function getPartyList(){
    $.ajax({
		type: "POST",
		url: "get-party-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderPartyList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderPartyList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-party" class="col-form-label">Partylist:</label>\
                    <select class="form-control form-control-sm" id="resp-party">\
                        <option value="">SELECT PARTYLIST</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#party-select-container").html(markUp);
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
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-mayor" class="col-form-label">Mayor:</label>\
                    <select class="form-control form-control-sm" id="resp-mayor">\
                        <option value="">SELECT MAYOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#mayor-select-container").html(markUp);
}

function getVMayorList(){
    $.ajax({
		type: "POST",
		url: "get-vmayor-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVMayorList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVMayorList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-vmayor" class="col-form-label">Vice Mayor:</label>\
                    <select class="form-control form-control-sm" id="resp-vmayor">\
                        <option value="">SELECT VICE MAYOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#vmayor-select-container").html(markUp);
}

function getSenatorList(){
    $.ajax({
		type: "POST",
		url: "get-senator-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderSenatorList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderSenatorList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen1">\
                        <option value="">SELECT 1st SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen1-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen2">\
                        <option value="">SELECT 2nd SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen2-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen3">\
                        <option value="">SELECT 3rd SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen3-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen4">\
                        <option value="">SELECT 4th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen4-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen5">\
                        <option value="">SELECT 5th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen5-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen6">\
                        <option value="">SELECT 6th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen6-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen7">\
                        <option value="">SELECT 7th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen7-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen8">\
                        <option value="">SELECT 8th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen8-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen9">\
                        <option value="">SELECT 9th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen9-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen10">\
                        <option value="">SELECT 10th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen10-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen11">\
                        <option value="">SELECT 11th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen11-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sen12">\
                        <option value="">SELECT 12th SENATOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sen12-select-container").html(markUp);
}

function getRepList(){
    $.ajax({
		type: "POST",
		url: "get-rep-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderRepList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderRepList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-rep" class="col-form-label">Representative:</label>\
                    <select class="form-control form-control-sm" id="resp-rep">\
                        <option value="">SELECT REPRESENTATIVE</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#rep-select-container").html(markUp);
}

function getGovList(){
    $.ajax({
		type: "POST",
		url: "get-gov-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderGovList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderGovList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-gov" class="col-form-label">Governor:</label>\
                    <select class="form-control form-control-sm" id="resp-gov">\
                        <option value="">SELECT GOVERNOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#gov-select-container").html(markUp);
}

function getVGovList(){
    $.ajax({
		type: "POST",
		url: "get-vgov-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVGovList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVGovList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group border border-primary p-2">\
                    <label for="resp-vgov" class="col-form-label">Vice Governor:</label>\
                    <select class="form-control form-control-sm" id="resp-vgov">\
                        <option value="">SELECT VICE GOVERNOR</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#vgov-select-container").html(markUp);
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
    var markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sang1">\
                        <option value="">SELECT 1st SP MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sp1-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sang2">\
                        <option value="">SELECT 2nd SP MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sp2-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sang3">\
                        <option value="">SELECT 3rd SP MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sp3-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sang4">\
                        <option value="">SELECT 4th SP MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sp4-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-sang5">\
                        <option value="">SELECT 5th SP MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sp5-select-container").html(markUp);
}

function getSBList(){
    $.ajax({
		type: "POST",
		url: "get-sb-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderSBList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderSBList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan1">\
                        <option value="">SELECT 1st SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb1-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan2">\
                        <option value="">SELECT 2nd SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb2-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan3">\
                        <option value="">SELECT 3rd SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb3-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan4">\
                        <option value="">SELECT 4th SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb4-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan5">\
                        <option value="">SELECT 5th SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb5-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan6">\
                        <option value="">SELECT 6th SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb6-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan7">\
                        <option value="">SELECT 7th SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb7-select-container").html(markUp);

    markUp = '<div class="form-group">\
                    <select class="form-control form-control-sm" id="resp-bayan8">\
                        <option value="">SELECT 8th SB MEMBER</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#sb8-select-container").html(markUp);
}

var sen = [];
var sp = [];
var sb = [];

function senCount(senator){
    var count = 0;
    for(const data of sen){
        if(data == senator){
            count += 1;
        }
    }
    return count;
}

function sangCount(sang){
    var count = 0;
    for(const data of sp){
        if(data == sang){
            count += 1;
        }
    }
    return count;
}

function bayanCount(bayan){
    var count = 0;
    for(const data of sb){
        if(data == bayan){
            count += 1;
        }
    }
    return count;
}

function saveResp(){
    var press = $("#resp-press").val();
    var vpress = $("#resp-vpress").val();
    var sen1 = $("#resp-sen1").val();
    var sen2 = $("#resp-sen2").val();
    var sen3 = $("#resp-sen3").val();
    var sen4 = $("#resp-sen4").val();
    var sen5 = $("#resp-sen5").val();
    var sen6 = $("#resp-sen6").val();
    var sen7 = $("#resp-sen7").val();
    var sen8 = $("#resp-sen8").val();
    var sen9 = $("#resp-sen9").val();
    var sen10 = $("#resp-sen10").val();
    var sen11 = $("#resp-sen11").val();
    var sen12 = $("#resp-sen12").val();
    var rep = $("#resp-rep").val();
    var gov = $("#resp-gov").val();
    var vgov = $("#resp-vgov").val();
    var sang1 = $("#resp-sang1").val();
    var sang2 = $("#resp-sang2").val();
    var sang3 = $("#resp-sang3").val();
    var sang4 = $("#resp-sang4").val();
    var sang5 = $("#resp-sang5").val();
    var mayor = $("#resp-mayor").val();
    var vmayor = $("#resp-vmayor").val();
    var bayan1 = $("#resp-bayan1").val();
    var bayan2 = $("#resp-bayan2").val();
    var bayan3 = $("#resp-bayan3").val();
    var bayan4 = $("#resp-bayan4").val();
    var bayan5 = $("#resp-bayan5").val();
    var bayan6 = $("#resp-bayan6").val();
    var bayan7 = $("#resp-bayan7").val();
    var bayan8 = $("#resp-bayan8").val();
    var party = $("#resp-party").val();
    var error = "";
    sen = [];
    sen.push(sen1);
    sen.push(sen2);
    sen.push(sen3);
    sen.push(sen4);
    sen.push(sen5);
    sen.push(sen6);
    sen.push(sen7);
    sen.push(sen8);
    sen.push(sen9);
    sen.push(sen10);
    sen.push(sen11);
    sen.push(sen12);
    sp = [];
    sp.push(sang1);
    sp.push(sang2);
    sp.push(sang3);
    sp.push(sang4);
    sp.push(sang5);
    sb = [];
    sb.push(bayan1);
    sb.push(bayan2);
    sb.push(bayan3);
    sb.push(bayan4);
    sb.push(bayan5);
    sb.push(bayan6);
    sb.push(bayan7);
    sb.push(bayan8);
    //alert(senCount(sen1));
    if(press == "" || press == undefined){
        error = "*Please select president!";
    }else if(vpress == "" || vpress == undefined){
        error = "*Please select Vice President!";
    }else if(party == "" || party == undefined){
        error = "*Please select Partylist!";
    }else if(rep == "" || rep == undefined){
        error = "*Please select a Representative!";
    }else if(gov == "" || gov == undefined){
        error = "*Please select Governor!";
    }else if(vgov == "" || vgov == undefined){
        error = "*Please select Vice Governor!";
    }else if(mayor == "" || mayor == undefined){
        error = "*Please select Mayor!";
    }else if(vmayor == "" || vmayor == undefined){
        error = "*Please select Vice Mayor!";
    }else if(sen1 == "" || sen1 == undefined){
        error = "*Please select 1st Senator!";
    }else if(sen2 == "" || sen2 == undefined){
        error = "*Please select 2nd Senator!";
    }else if(sen3 == "" || sen3 == undefined){
        error = "*Please select 3rd Senator!";
    }else if(sen4 == "" || sen4 == undefined){
        error = "*Please select 4th Senator!";
    }else if(sen5 == "" || sen5 == undefined){
        error = "*Please select 5th Senator!";
    }else if(sen6 == "" || sen6 == undefined){
        error = "*Please select 6th Senator!";
    }else if(sen7 == "" || sen7 == undefined){
        error = "*Please select 7th Senator!";
    }else if(sen8 == "" || sen8 == undefined){
        error = "*Please select 8th Senator!";
    }else if(sen9 == "" || sen9 == undefined){
        error = "*Please select 9th Senator!";
    }else if(sen10 == "" || sen10 == undefined){
        error = "*Please select 10th Senator!";
    }else if(sen11 == "" || sen11 == undefined){
        error = "*Please select 11th Senator!";
    }else if(sen12 == "" || sen12 == undefined){
        error = "*Please select 12th Senator!";
    }else if(senCount(sen1) > 1){
        error = "*You have selected the 1st Senator more than once!";
    }else if(senCount(sen2) > 1){
        error = "*You have selected the 2nd Senator more than once!";
    }else if(senCount(sen3) > 1){
        error = "*You have selected the 3rd Senator more than once!";
    }else if(senCount(sen4) > 1){
        error = "*You have selected the 4th Senator more than once!";
    }else if(senCount(sen5) > 1){
        error = "*You have selected the 5th Senator more than once!";
    }else if(senCount(sen6) > 1){
        error = "*You have selected the 6th Senator more than once!";
    }else if(senCount(sen7) > 1){
        error = "*You have selected the 7th Senator more than once!";
    }else if(senCount(sen8) > 1){
        error = "*You have selected the 8th Senator more than once!";
    }else if(senCount(sen9) > 1){
        error = "*You have selected the 9th Senator more than once!";
    }else if(senCount(sen10) > 1){
        error = "*You have selected the 10th Senator more than once!";
    }else if(senCount(sen11) > 1){
        error = "*You have selected the 11th Senator more than once!";
    }else if(senCount(sen12) > 1){
        error = "*You have selected the 12th Senator more than once!";
    }else if(sang1 == "" || sang1 == undefined){
        error = "*Please select 1st SP Member!";
    }else if(sang2 == "" || sang2 == undefined){
        error = "*Please select 2nd SP Member!";
    }else if(sang3 == "" || sang3 == undefined){
        error = "*Please select 3rd SP Member!";
    }else if(sang4 == "" || sang4 == undefined){
        error = "*Please select 4th SP Member!";
    }else if(sang5 == "" || sang5 == undefined){
        error = "*Please select 5th SP Member!";
    }else if(sangCount(sang1) > 1){
        error = "*You have selected the 1st SP Member more than once!";
    }else if(sangCount(sang2) > 1){
        error = "*You have selected the 2nd SP Member more than once!";
    }else if(sangCount(sang3) > 1){
        error = "*You have selected the 3rd SP Member more than once!";
    }else if(sangCount(sang4) > 1){
        error = "*You have selected the 4th SP Member more than once!";
    }else if(sangCount(sang5) > 1){
        error = "*You have selected the 5th SP Member more than once!";
    }else if(bayan1 == "" || bayan1 == undefined){
        error = "*Please select 1st SB Member!";
    }else if(bayan2 == "" || bayan2 == undefined){
        error = "*Please select 2nd SB Member!";
    }else if(bayan3 == "" || bayan3 == undefined){
        error = "*Please select 3rd SB Member!";
    }else if(bayan4 == "" || bayan4 == undefined){
        error = "*Please select 4th SB Member!";
    }else if(bayan5 == "" || bayan5 == undefined){
        error = "*Please select 5th SB Member!";
    }else if(bayan6 == "" || bayan6 == undefined){
        error = "*Please select 6th SB Member!";
    }else if(bayan7 == "" || bayan7 == undefined){
        error = "*Please select 7th SB Member!";
    }else if(bayan8 == "" || bayan8 == undefined){
        error = "*Please select 8th SB Member!";
    }else if(bayanCount(bayan1) > 1){
        error = "*You have selected the 1st SB Member more than once!";
    }else if(bayanCount(bayan2) > 1){
        error = "*You have selected the 2nd SB Member more than once!";
    }else if(bayanCount(bayan3) > 1){
        error = "*You have selected the 3rd SB Member more than once!";
    }else if(bayanCount(bayan4) > 1){
        error = "*You have selected the 4th SB Member more than once!";
    }else if(bayanCount(bayan5) > 1){
        error = "*You have selected the 5th SB Member more than once!";
    }else if(bayanCount(bayan6) > 1){
        error = "*You have selected the 6th SB Member more than once!";
    }else if(bayanCount(bayan7) > 1){
        error = "*You have selected the 7th SB Member more than once!";
    }else if(bayanCount(bayan8) > 1){
        error = "*You have selected the 8th SB Member more than once!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-resp.php",
            dataType: 'html',
            data: {
                idx:respIdx,
                press:press,
                vpress:vpress,
                sen1:sen1,
                sen2:sen2,
                sen3:sen3,
                sen4:sen4,
                sen5:sen5,
                sen6:sen6,
                sen7:sen7,
                sen8:sen8,
                sen9:sen9,
                sen10:sen10,
                sen11:sen11,
                sen12:sen12,
                rep:rep,
                gov:gov,
                vgov:vgov,
                sang1:sang1,
                sang2:sang2,
                sang3:sang3,
                sang4:sang4,
                sang5:sang5,
                mayor:mayor,
                vmayor:vmayor,
                bayan1:bayan1,
                bayan2:bayan2,
                bayan3:bayan3,
                bayan4:bayan4,
                bayan5:bayan5,
                bayan6:bayan6,
                bayan7:bayan7,
                bayan8:bayan8,
                party:party
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#edit-resp-modal").modal("hide");
                    getRespList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#edit-resp-modal-error").text(error);
}

function editResp(idx){
    respIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-resp-detail.php",
        dataType: 'html',
        data: {
            idx:respIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditResp(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditResp(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        $("#resp-name").val(list.name);
        $("#resp-barangay").val(list.barangay);
        $("#resp-purok").val(list.purok);
        $("#resp-press").val(list.press);
        $("#resp-vpress").val(list.vpress);
        $("#resp-sen1").val(list.sen1);
        $("#resp-sen2").val(list.sen2);
        $("#resp-sen3").val(list.sen3);
        $("#resp-sen4").val(list.sen4);
        $("#resp-sen5").val(list.sen5);
        $("#resp-sen6").val(list.sen6);
        $("#resp-sen7").val(list.sen7);
        $("#resp-sen8").val(list.sen8);
        $("#resp-sen9").val(list.sen9);
        $("#resp-sen10").val(list.sen10);
        $("#resp-sen11").val(list.sen11);
        $("#resp-sen12").val(list.sen12);
        $("#resp-rep").val(list.rep);
        $("#resp-gov").val(list.gov);
        $("#resp-vgov").val(list.vgov);
        $("#resp-sang1").val(list.sang1);
        $("#resp-sang2").val(list.sang2);
        $("#resp-sang3").val(list.sang3);
        $("#resp-sang4").val(list.sang4);
        $("#resp-sang5").val(list.sang5);
        $("#resp-mayor").val(list.mayor);
        $("#resp-vmayor").val(list.vmayor);
        $("#resp-bayan1").val(list.bayan1);
        $("#resp-bayan2").val(list.bayan2);
        $("#resp-bayan3").val(list.bayan3);
        $("#resp-bayan4").val(list.bayan4);
        $("#resp-bayan5").val(list.bayan5);
        $("#resp-bayan6").val(list.bayan6);
        $("#resp-bayan7").val(list.bayan7);
        $("#resp-bayan8").val(list.bayan8);
        $("#resp-party").val(list.party);
    })
    $("#edit-resp-modal-error").text("");
    $("#edit-resp-modal").modal("show");
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