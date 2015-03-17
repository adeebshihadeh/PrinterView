var printerIP = "pb.local";
var apiKey = "25A1AE457F3E4ACF854B80A51BA51776";

function updatePrinterStatus(){

    $.ajaxSetup({
        headers : {
            "X-Api-Key" : apiKey
        }
    });
    $.getJSON("http://"+printerIP+"/api/job", function(json){document.getElementById("jobStatus").innerHTML="State: "+json.state});

}

updatePrinterStatus();
