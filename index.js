var printerIP = "pb.local";
var apiKey = "25A1AE457F3E4ACF854B80A51BA51776";

function initialInfo(){
    $.ajaxSetup({
        headers : {
            "X-Api-Key" : apiKey
        }
    });
    $.getJSON("http://"+printerIP+"/api/printerprofiles", function(json){document.getElementById("title").innerHTML="Printer: "+json.profiles._default.name});

    updatePrinterStatus();
}

function updatePrinterStatus(){

    $.ajaxSetup({
        headers : {
            "X-Api-Key" : apiKey
        }
    });
    $.getJSON("http://"+printerIP+"/api/job", function(json){document.getElementById("jobStatus").innerHTML="State: "+json.state});

}

initialInfo();
