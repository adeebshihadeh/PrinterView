var printerIP = "prusa.local";
var apiKey = "156A8AE4000940CFB3C51C9DFD812D8A";

window.onload = function(){
    initialInfo();
}

function initialInfo(){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apiKey}});
    // get name of the printer
    $.getJSON("http://"+printerIP+"/api/printerprofiles", function(json){document.getElementById("printerName").innerHTML=json.profiles._default.name});
    document.getElementById("printerIP").innerHTML = printerIP;

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
        document.getElementById("currentFile").innerHTML="File: "+json.job.file.name.split(".").slice(0, -1).join(".");
        // get estimation of print time left
        document.getElementById("timeLeft").innerHTML="Time left: "+json.progress.printTimeLeft/60 + " minutes";
        // get percentage of print completion
        document.getElementById("printPercent").innerHTML=json.progress.completion.toFixed(2)*100+"%";
        });

    // get info on temps
    $.getJSON("http://"+printerIP+"/api/printer", function(json){
        // get temp of extruder 0 and its target temp
        document.getElementById("e0Temp").innerHTML="Extruder: "+json.temperature.tool0.actual+"°/"+json.temperature.tool0.target+"°";
        // get temp of the bed and its target temp
        document.getElementById("bedTemp").innerHTML="Bed: "+json.temperature.bed.actual+"°/"+json.temperature.bed.target+"°";
    });
}
