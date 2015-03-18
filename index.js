var refreshRate = 10000; // in milliseconds
var numPrinters = 0;
var printers ={
    "ip":[],
    "apikey":[]
};

window.onload = function(){

    //initialInfo();
    addPrinter("prusa.local", "156A8AE4000940CFB3C51C9DFD812D8A");
    addPrinter("pb.local", "25A1AE457F3E4ACF854B80A51BA51776");
    setInterval(function () {updatePrinters();}, refreshRate);
}

function initialInfo(ip, apikey, index){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apikey}});
    // get name of the printer
    $.getJSON("http://"+ip+"/api/printerprofiles", function(json){document.getElementById("printerName"+index).innerHTML=json.profiles._default.name});
    document.getElementById("printerIP"+index).innerHTML = ip;

    updateStatus(ip, apikey, index);
}

function updateStatus(ip, apikey, index){
    // add apikey header to GET request
    $.ajaxSetup({headers:{"X-Api-Key" : apikey}});

    // get info on current print job
    $.getJSON("http://"+ip+"/api/job", function(json){
        // get printer state
        document.getElementById("printerStatus"+index).innerHTML="State: "+json.state;
        //get filename of print
        document.getElementById("currentFile"+index).innerHTML="File: "+json.job.file.name.split(".").slice(0, -1).join(".");
        // get estimation of print time left
        document.getElementById("timeLeft"+index).innerHTML="Time left: "+(json.progress.printTimeLeft/60).toFixed(2) + " minutes";
        // get percentage of print completion
        document.getElementById("printPercent"+index).innerHTML=json.progress.completion.toFixed(0)+"%";
        });

    // get info on temps
    $.getJSON("http://"+ip+"/api/printer", function(json){
        // get temp of extruder 0 and its target temp
        document.getElementById("e0Temp"+index).innerHTML="Extruder: "+json.temperature.tool0.actual+"°/"+json.temperature.tool0.target+"°";
        // get temp of the bed and its target temp
        document.getElementById("bedTemp"+index).innerHTML="Bed: "+json.temperature.bed.actual+"°/"+json.temperature.bed.target+"°";
    });
}

function updatePrinters(){
  for(var i=0;i<numPrinters;i++){
    updateStatus(printers.ip[i],printers.apikey[i], i);
  }
}

function addPrinter(ip, apikey){
  var printerNum = numPrinters;

  // add HTML
  $("#printerPanels").append('<div class="panel panel-primary">');
  $("#printerPanels").append('<div class="panel-heading" id="printerName'+printerNum+'">Printer 1</div>');
  $("#printerPanels").append('<div class="panel-body" id="body'+printerNum+'">');
  $("#body"+printerNum).append('<div id="printerInfo'+printerNum+'">');
  $("#body"+printerNum).append('<p id="printerStatus'+printerNum+'">status</p>');
  $("#body"+printerNum).append('<p id="e0Temp'+printerNum+'">0</p>');
  $("#body"+printerNum).append('<p id="bedTemp'+printerNum+'">0</p>');
  $("#body"+printerNum).append('<p id="currentFile'+printerNum+'">No active print</p>');
  $("#body"+printerNum).append('<p id="printPercent'+printerNum+'">0%</p>');
  $("#body"+printerNum).append('<p id="timeLeft'+printerNum+'">Print Time Left</p>');
  $("#printerPanels").append('</div>');
  $("#printerPanels").append('</div>');
  $("#printerPanels").append('<div class="panel-footer" id="printerIP'+printerNum+'">ip</div>');
  $("#printerPanels").append('</div>');

  // store ip and apikey info
  printers.ip[printerNum]=ip;
  printers.apikey[printerNum]=apikey;

  // get initial info on printer
  initialInfo(ip, apikey, printerNum);

  numPrinters++;
}
