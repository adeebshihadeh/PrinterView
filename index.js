var printerIP = "prusa.local";
var apiKey = "156A8AE4000940CFB3C51C9DFD812D8A";

function initialInfo(){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apiKey}});
    // get name of the printer
    $.getJSON("http://"+printerIP+"/api/printerprofiles", function(json){document.getElementById("printerName").innerHTML="Printer: "+json.profiles._default.name});

    updatePrinterStatus();
}

function updatePrinterStatus(){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apiKey}});

    // get info on current print job
    $.getJSON("http://"+printerIP+"/api/job", function(json){
        // get printer state
        document.getElementById("printerStatus").innerHTML="State: "+json.state;
        //get filename of print
        document.getElementById("currentPrint").innerHTML="Current Print: "+json.job.file.name;
        // get estimation of print time left
        document.getElementById("timeLeft").innerHTML="Time left: "+json.progress.printTimeLeft/60 + " minutes";
        });
}

initialInfo();
