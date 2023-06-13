/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
#include "json2.js";

function sayHello(){
    alert("AAGH")
}


// three functions because the arguments on mainjs would look insane
function changeColour(type, c,m,y,k){
    try{
        app.activeDocument.colors.item(type+ " Color").colorValue = [parseInt(c),parseInt(m),parseInt(y),parseInt(k)]; // CMYK. Hardcode: [100,50,0,0]
    } catch (e){
        alert("No swatch found for: " + type + " Color.")
    }
    
}

function addSchedule(path){
    try{
      app.activeDocument.dataMergeProperties.removeDataSource();  
      app.activeDocument.dataMergeProperties.selectDataSource(path);  
    //   File("../launchPS.scpt").execute();
    } catch(e){
        alert(e);
    }
    // selectDataSource(dataSourceFile:File)
}

// talkToPhotoshop();
// talkToPhotoshop("/Users/csetuser/Library/Application Support/Adobe/CEP/extensions/com.example.bridgetalk/jsx/exec_photoshop.jsx", "{\"name":"Tennesee Titans","preseason":true,"text":"Hi"}")

function talkToPhotoshop(jsxPath, fbOptions) {

    fbOptions = JSON.parse(fbOptions);

    // Create a new File object and specify the path to the file you want to read.
    var file = new File(jsxPath);

    // Open the file for reading.
    file.open("r");

    // Use the File object's read() method to read the contents of the file into a string.
    var fileContents = file.read();

    // Close the file.
    file.close();

    // Create a new BridgeTalk object 
    var bt = new BridgeTalk();

        // Front load the variables
        // var footballTeam = "Tennessee Titans";
        // var awayOrHome = "Away";
        // var timeZone = "EST";

        // Define argument params to pass to Photoshop
        var params = "\
            var argv1 = 'Football' \
            var argv2 = '" + fbOptions.name + "' \
            var argv3 = '" + fbOptions.preseason + "' \
            var argv4 = '" + fbOptions.text + "' \
        "

        // Target Photoshop
        bt.target = "photoshop";
        
        // JavaScript to execute...
        bt.body = params + fileContents;

        // On success...
        bt.onResult = function (msg) {
            alert("Talked to Photoshop!")
        };

        // On error...
        bt.onError = function (err) {
            alert("Error: " + err);
        }
        
        // Bombs away...
        bt.send();

}
