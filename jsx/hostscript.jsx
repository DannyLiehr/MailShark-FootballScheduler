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

function talkToPhotoshop(jsxPath, fbOptions, actDir, playDir) {

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
        // app.activeDocument.filePath
        // app.activeDocument.filePath.includes("gjkfhl") ? "~/Desktop" : app.activeDocument.filePath
        // var fileDir;
        // if (app.activeDocument.saved){
        //     // Not an indt!
        //     fileDir= app.activeDocument.filePath + "/Links/";
        // } else{
        //     // indt, plop it somewhere
        //     fileDir= "~/Downloads";
        //     alert("This is an indesign template, so the image will be put on youor Desktop. Please package this document as soon as possible so other artists can access this too.")
        // }

        var curDate = new Date().valueOf();

        var params = "\
            var argv1 = '" + fbOptions.name + "' \
            var argv2 = '" + fbOptions.preseason + "' \
            var argv3 = '" + fbOptions.text + "' \
            var argv4 = '" + fbOptions.type + "' \
            var argv5 = '" + actDir +"' \
            var argv6 = '" + playDir +"' \
            var argv7 = '" + fbOptions.number +"' \
            var argv8 = \"" + playDir  +"\" \
            var argv9 = \"" + curDate +"\" \
        ";
        // Target Photoshop
        bt.target = "photoshop";      
        // JavaScript to execute...
        bt.body = params + fileContents;
        // On success...
        bt.onResult = function (msg) {
            // From here, relink the player file. We'll need to find a way to do that easily. Maybe name the object specifically in the INDD file?
            // var fbLink = app.activeDocument.links.itemByName("MS-player.psd");
            var links= app.activeDocument.links;

            for (var i = 0; i < links.length; i++) {
                if (links[i].label == "fbPlayer"){
                    // alert("Found it!");
                    links[i].relink(new File(playDir + "/FootballPlayer "+ curDate +".png"));
                }
            }

            // $.sleep(1000);.
            alert("The player image is saved in a place that other artists can't access, so make sure to package this when you're done! Thanks.")
        };
        // On error...
        bt.onError = function (err) {
            alert("Oops! Error: " + err.body);
        }
        // Bombs away...
        alert("Photoshop is about to open to generate a schedule image. You may need to click on it on the dock to continue generating a schedule.");
        bt.send();

}
