/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
#include "json2.js";


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
      // Removes the current data source to put our own in
      app.activeDocument.dataMergeProperties.removeDataSource(); 
      // Adds the data source of the selected team based on their path. 
      app.activeDocument.dataMergeProperties.selectDataSource(path);  
    } catch(e){
        alert(e);
    }
}

function talkToPhotoshop(jsxPath, fbOptions, actDir, playDir, numText) {

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

        // Define argument params to pass to Photoshop
        // Line 9: var argv8 = '~/Library/CloudStorage/OneDrive-SharedLibraries-MailShark/Prepress%20Team%20-%20Documents/General/Artist%20Folders/Danny's_Files/Active%20Projects/!!_Internal'
        // Expected: ;
        var params = "\
            var argv1 = '" + fbOptions.name + "' \
            var argv2 = '" + fbOptions.preseason + "' \
            var argv3 = '" + fbOptions.text + "' \
            var argv4 = '" + fbOptions.type + "' \
            var argv5 = '" + actDir +"'\
            var argv6 = '" + playDir +"'\
            var argv7 = '" + fbOptions.number +"'\
            var argv8 = '" + app.activeDocument.filePath.path +"'\
        ";
        // Target Photoshop
        bt.target = "photoshop";      
        // JavaScript to execute...
        bt.body = params + fileContents;
        // On success...
        bt.onResult = function (msg) {
            // alert("Talked to Photoshop!")
            // From here, relink the player file. We'll need to find a way to do that easily. Maybe name the object specifically in the INDD file?
        };
        // On error...
        bt.onError = function (err) {
            alert("Oops! Error: " + err.body);
        }
        // Bombs away...
        alert("Photoshop is about to open to generate a schedule image. You may need to click on it on the dock to continue generating a schedule.");
        bt.send();

}
