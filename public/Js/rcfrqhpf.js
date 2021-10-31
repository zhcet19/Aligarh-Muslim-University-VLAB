/* Document Name:rcfrqhpf.js
 * Author Name:Sukriti
 *  Created on : 15 sept, 2019, 20:21:22 PM 
 */
var fq,vi;
var rl;
var cl;
var w, f;

function resldChange() {
    rl = document.getElementById("rl").value;
    document.getElementById("rload").value = rl;
}

function capldChange() {
    cl = document.getElementById("cl").value;
    document.getElementById("cload").value = cl;
}
function vinChange(){
    vi=document.getElementById("vin").value;
    document.getElementById("inpvolt").value=vi;
    
}
function freqChange() {
    fq = document.getElementById("fq").value;
    w = Math.pow(10, fq); //logspace(1,10,20)ie first term is 1, last term is 10 ,number of terms is 20
    //alert(w);
    f = (parseFloat(w) / (2 * (Math.PI))).toPrecision(6); // f=w/2pi
    //alert(f);
    document.getElementById("fqr").value = Math.round(f);
}
var tabrowindex = 0;
var arr = [];
var table;
var chart,charts;
var dataPoints = [],dataPointsth=[];
var clmns, frqncy;

function tabled(){
    var cld=parseFloat(cl)* math.pow(10, -9);
    //-----------------------------------------------------------phase calculation----------------------------------------------------//        
        xc = 1 / (2 * 3.14 * parseFloat(f) * parseFloat(cld));//capacitive reactance of a capacitor 
       
        var z = Math.sqrt(Math.pow(parseFloat(rl), 2) + Math.pow(parseFloat(xc), 2));//impedance
        // alert("numim"+num.im);
       // h1 += z + "<br>";
        var o = Math.atan(1/(2 * 3.14 * parseFloat(f) * parseFloat(cld) * parseFloat(rl)));//phase shift
        var theta = ((180 / 3.14) * parseFloat(o)).toPrecision(6);
        //h2 += theta + "<br>";
      //alert(theta);
//--------------------------------------------------------------magnitude calculation-----------------------------------------------//
        var absolute = (parseFloat(rl) / +parseFloat(z));
       // h += absolute + "<br>";
        var mag = 20 * Math.log10(parseFloat(absolute)).toPrecision(6);
        //mg += mag + "<br>";
       // dataPoints.push({x: parseFloat(f), y: parseFloat(mag)});
        //alert(mag);
        var vo= (parseInt(vi)*(absolute)).toPrecision(5);
        document.getElementById("vout").value=parseFloat(vo);
        
    table = document.getElementById("mytable");
    arr[0] = tabrowindex + 1;
    arr[1] = Math.round(f);
    arr[2] = mag;
    arr[3]=theta;
    arr[4]=vo;
    
    if (document.getElementById("rload").value == "") {
        alert("Enter the  load Resistance");
        document.getElementById("rload").style.borderColor = "red";
    }

    else if (document.getElementById("cload").value === "") {
        alert("Enter the  Collector Resistance");
        document.getElementById("cload").style.borderColor = "red";
    }
   
    
    else if (document.getElementById("fqr").value == "") {
        alert("Enter the Input Frequency");
        document.getElementById("fqr").style.borderColor = "red";
//        document.getElementById("demo").innerHTML = "Enter the Input Voltage";
    }

    else if (Math.round(frqncy) == Math.round(f)) {
//document.getElementById("demo").innerHTML = "Change the Frequency";
        alert("Change the Frequency");
        document.getElementById("fqr").style.borderColor = "red";
    }
    else if (table.rows.length <= 25) {
        document.getElementById("fqr").style.borderColor = "green";
        var row = table.insertRow(++tabrowindex); // Row increment
        for (var q = 0; q < 5; q++) {
            var cell = row.insertCell(q);
            cell.innerHTML = arr[q];
        }

    }
    clmns = table.rows[tabrowindex].cells;
    frqncy = clmns[1].innerHTML;


}

//--------------------------------------------------------- scroll to bottom--------------------------------------------------//
/*$(document).ready(function () {
    $("#graphplot").click(function () {
        $('html,body').animate({
            scrollTop: $("#grpwrap").offset().top},
        'slow');
    });

});*/

//-----------------------------------------------------------------canvas.js ---------------------------------------------------------------//

function showDiv(){
    var w = document.getElementById("graphplot").options[document.getElementById("graphplot").selectedIndex].value;
			if(w==0){
                            document.getElementById("demo").innerHTML = "Choose to plot";
        document.getElementById("graphplot").style.borderColor = "red";
                        }
                        else if(w==1){
                            document.getElementById("demo").innerHTML = "Frequency Response of 1st order low pass filter"; 
    document.getElementById('chartContainer').style.display = "block";
     document.getElementById('chartContainers').style.display = "none";
     document.getElementById("chartContainers").innerHTML = "";
     plotfrequency();
     tabrowindex = 0;
    dataPoints = [];
}
 else if(w==2){
      document.getElementById("demo").innerHTML = "Phase of 1st order low pass filter";
 document.getElementById('chartContainers').style.display = "block";
  document.getElementById('chartContainer').style.display = "none";
  document.getElementById("chartContainer").innerHTML = "";
  tabrowindexf = 0;
    dataPointsth = [];
  plotphase();
}
}

function plotfrequency(){
    //------------------ plot magnitude and freq-------------------------//
    //alert("plot frequency");
    for (var tabrowindexf = 1; tabrowindexf < table.rows.length; tabrowindexf++) {
        var rwef = table.rows[tabrowindexf].cells;     
         dataPointsth.push({x: parseFloat(rwef[1].innerHTML), y: parseFloat(rwef[2].innerHTML)});
    }
   
    
    charts = new CanvasJS.Chart("chartContainer", {
        theme: "theme1", //theme1
        // backgroundColor: "#bdf5bd",
        title: {
            text: "Frequency Response of a 1st Order High Pass Filter "
        },
        // animationEnabled: true,
        // change to true
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center",
        },
        axisX: {
            logarithmic: true,
            gridColor: "lightblue",
            gridThickness: 2,
            title: "Frequency(Hz)",
            includeZero: false,
            labelFormatter: addSymbols,
        },
        axisY: {
            title: "Magnitude(dB)",
        },
        data: [
            {
                type: "line",
                dataPoints: dataPointsth

            }
        ]
    });

    charts.render();
}
function plotphase() {
//-------------------------plot phase and freq---------------------------------//
    // alert("plot phase");
    for (var tabrowindex = 1; tabrowindex < table.rows.length; tabrowindex++) {
        var rwep = table.rows[tabrowindex].cells;
        dataPoints.push({x: parseFloat(rwep[1].innerHTML), y: parseFloat(rwep[3].innerHTML)});
    }
   
    
    chart = new CanvasJS.Chart("chartContainers", {
        theme: "theme1", //theme1
        // backgroundColor: "#bdf5bd",
        title: {
            text: "Phase of a 1st Order High Pass Filter "
        },
        // animationEnabled: true,
        // change to true
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center",
        },
        axisX: {
            logarithmic: true,
            gridColor: "lightblue",
            gridThickness: 2,
            title: "Frequency(Hz)",
            includeZero: false,
            labelFormatter: addSymbols,
        },
        axisY: {
            title: "Phase(theta)",
        },
        data: [
            {
                type: "line",
                dataPoints: dataPoints

            }
        ]
    });

    chart.render();
    
}


function addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];

    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
        order = suffixes.length - 1;

    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

