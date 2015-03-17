var printerIP = "pb.local";
var apiKey = "25A1AE457F3E4ACF854B80A51BA51776";

function initialInfo(){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apiKey}});
    // get name of the printer
    $.getJSON("http://"+printerIP+"/api/printerprofiles", function(json){document.getElementById("title").innerHTML="Printer: "+json.profiles._default.name});

    updatePrinterStatus();
}

function updatePrinterStatus(){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apiKey}});
    // get state of the printer
    $.getJSON("http://"+printerIP+"/api/job", function(json){document.getElementById("jobStatus").innerHTML="State: "+json.state});
    // get name of current file being printed
    $.getJSON("http://"+printerIP+"/api/job", function(json){document.getElementById("currentPrint").innerHTML="Current Print: "+json.job.file.name});

}

initialInfo();
