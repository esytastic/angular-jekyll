var construction_array;

$(function () {
    getConstrution();
});

function getConstrution() {
    $.getJSON(construction_api_url, function (data) {
        construction_array = data;
        setConstruction();
    });
}

function setConstruction() {

    var html_text = '';

    var data_length = construction_array.data.List.length;
    if (data_length > 0) {
        $.each(construction_array.data.List, function (i, item) {
            var name_json = jQuery.parseJSON(item.Name);
            var address_json = jQuery.parseJSON(item.Address);

            var Name = name_json.List[1].Value;
            var Status = item.Status;
            var Address = address_json.List[1].Value;
            var ConstructionStart = item.ConstructionStart;
            var ConstructionEnd = item.ConstructionEnd;

            html_text += "<div class='col-xs-6 under_name'>" + Name + " </div>";
            html_text += " <div class='col-xs-6 under_state'></div>";
            html_text += " <div class='col-xs-12 under_addresss'>" + Address + " </div>";
            html_text += " <div class='col-xs-12 under_time'>預計停機時間:" + ConstructionStart + "~" + ConstructionEnd + " </div>";
        });

        $('#vm_data').html(html_text);
    } else {
        $('.press-main h2').css("margin", "30px 0px 400px 0px").html("尚無維護中的電池交換站");
    }
}