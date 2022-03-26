$(document).ready(function() {
    setTimeout(function(){
        $("#surveyresult-menu").attr("href","#");
        $("#surveyresult-menu").addClass("active");
    },100)
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

filterChange();
getUserDetails();
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

function filterChange(){
    var filter = $("#filter").val();
    $.ajax({
		type: "POST",
		url: "get-filter-result.php",
		dataType: 'html',
		data: {
			filter:filter
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderFilterChange(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderFilterChange(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="surveyresult-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Votes</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.vote+'</td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#surveyresult-table-container").html(markUp);
    $("#surveyresult-table").DataTable();
}

function exportToExcel(){
    //alert("test");
    //return;
    var fileName = new Date();
    var filter = $("#filter option:selected" ).text();
    $("#surveyresult-table").table2excel({
        name:"Survey Result",
        filename:filter+"_survey_result"+fileName,//do not include extension
        fileext:".xlsx" // file extension
    });
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