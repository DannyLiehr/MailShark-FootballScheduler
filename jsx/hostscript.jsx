/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
#include "json2.js";

/**
 * Open
 * @param {string} fbOptions 
 * @param {*} playDir 
 */
// (fbOptions, playDir)
function openDoc(fbOptions, playDir){
    // alert("Opening doc!")
    try{
      fbOptions = JSON.parse(fbOptions);
        if(fbOptions.type == "Helmet"){
            // Open compact template
            app.open(File(playDir + "/compact.indt"));
        } else {
            // Open default template
            app.open(File(playDir + "/default.indt"));
        }  
    } catch(e){
        alert(e);
    }
}


/**
    * Changes the swatch colours on the document.
    @param {string} c Cyan
    @param {string} m Magenta
    @param {string} y Yellow
    @param {string} k Key/Black

*/
function changeColour(type, c,m,y,k){
    try{
        app.activeDocument.colors.item(type+ " Color").colorValue = [parseInt(c),parseInt(m),parseInt(y),parseInt(k)]; // CMYK. Hardcode: [100,50,0,0]
    } catch (e){
        alert("No swatch found for: " + type + " Color.")
    }
    
}

/**
    * Changes the data source for the team on the document.
    @param {string} path CSV path for the selected team.

*/
function addSchedule(path){
    try{
      // Removes the current data source to put our own in
      app.activeDocument.dataMergeProperties.removeDataSource(); 
      // Adds the data source of the selected team based on their path. 
      app.activeDocument.dataMergeProperties.selectDataSource(path);  
      // Find a way to grab a specific entry??? 
    } catch(e){
        alert(e);
    }
}


/**
    * Launches Photoshop, makes actions happen, places the file and merges out the document.
    @param {string} jsxpath Path to exec_photoshop.jsx
    @param {string} fbOptions Stringified JSON of the football team & data necessary to create the files.
    @param {string} actDir Path to "actions" directory
    @param {string} playDir Path to "templates" directory
    @param {string} preseas Whether or not preseason is enabled
    @param {string} mergeIndex Which row of the CSV to merge out into a single page document
    @param {string} dest The user's filename to save the PDF as
    @param {string} csv Path to "CSV" directory

*/

function talkToPhotoshop(jsxPath, fbOptions, actDir, playDir, mergeIndex, csv, dest) {
    fbOptions = JSON.parse(fbOptions);
        // Check for what template is being used. If the template and image choice is incompatible, don't let the photoshop talk start.
        var links= app.activeDocument.links;

        var imageCompatible = true;
        for (var i = 0; i < links.length; i++) {
            if ((links[i].label == "fbPlayer" && fbOptions.type == "Helmet") || (links[i].label == "helmet" && fbOptions.type !== "Helmet")){
                alert("Error: The selected image mode does not match this schedule's template.");
                imageCompatible= false;
                break;
            }
        }

        if (imageCompatible == true){
            
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
           // Get active document
            var doc = app.activeDocument;

            // Don't give them the choice; they MUST save.
            doc.save();
            filePath= doc.filePath;
        //    var curDate = new Date().valueOf();
           var params = "\
               var argv1 = '" + fbOptions.name + "' \
               var argv2 = '" + fbOptions.preseason + "' \
               var argv3 = '" + fbOptions.text + "' \
               var argv4 = '" + fbOptions.type + "' \
               var argv5 = '" + actDir +"' \
               var argv6 = '" + playDir +"' \
               var argv7 = '" + fbOptions.number +"' \
               var argv8 = \"" + playDir  +"\" \
               var argv9 = \"" + filePath +"\" \
           ";
           // Target Photoshop
           bt.target = "photoshop";      
           // JavaScript to execute...
           bt.body = params + fileContents;
           // On success...
           bt.onResult = function (msg) {
               // From here, relink the player file. Iterate through all links and look for our labelled ones. They're labelled through a script so people can use the same template to change the team, in the event of a mis-click.
               for (var i = 0; i < links.length; i++) {
                links[i].update();
                   if (links[i].label == "fbPlayer" || links[i].label == "helmet"){
                       var fbName= filePath + "/" + fbOptions.name +" "+ fbOptions.number + ".psd";
                       var label= links[i].label;
                       links[i].relink(new File(fbName));
                       links[i].label= label;
                   }
                   
               }
   
               // hide all layers
               app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= false;
               app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= false;
               app.activeDocument.groups.itemByName("18 Games").visible= false;
               app.activeDocument.groups.itemByName("20 Games").visible= false;
   
               if (fbOptions.preseason == "without"){
                   // No preseason. So show only the 18 games layer
                   app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= true;
                   app.activeDocument.groups.itemByName("18 Games").visible= true;
               } else {
                   // Preseason on. Show only the 20 games layer.
                   app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= true;
                   app.activeDocument.groups.itemByName("20 Games").visible= true;
               }
   
   

   
                   try {
                    
                        // File paths
                        var sourceData = File(csv);
                        // Open the document
                        // var doc = app.open(source);
        
                        // Data merge settings
                        doc.dataMergeProperties.selectDataSource(sourceData);
                        doc.dataMergeProperties.dataMergePreferences.recordSelection = RecordSelection.ONE_RECORD;
                        // What record do we want?
                        doc.dataMergeProperties.dataMergePreferences.recordNumber = parseInt(mergeIndex);
                        app.dataMergeOptions.removeBlankLines = true;  
        
        
                        // Perform merge.
                        // ~/Library/CloudStorage/OneDrive-SharedLibraries-MailShark/Prepress%20Team%20-%20Documents/General/Artist%20Folders/Danny's_Files/Active%20Projects/!!_Internal/NFL%20Stuff/Test%20Run
                        var finalFile= File(filePath + "/"+ dest)
                        doc.dataMergeProperties.exportFile(finalFile, "[High Quality Print]",);
                        alert("Your PDF has been merged and saved to the folder you saved this document in.")
                   } catch (e) {
                        alert("Oops! " + e);
                   }
   
           };


        } else {
            alert("No")
        }


        // On error...
        bt.onError = function (err) {
            alert("Oops! Error: " + err.body);
        }

        
        // Bombs away...
        alert("Photoshop is about to open to generate a schedule image. You may need to click on it on the dock to continue generating a schedule.");
        bt.send();


}

// // jsxPath, fbOptions, actDir, playDir, preseas, mergeIndex, dest, csv
// talkToPhotoshop(
//     '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/jsx/exec_photoshop.jsx', 
//     '{"name":"Arizona Cardinals","preseason":"without","text":"","type":"Front","number":23}', 
//     '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/actions', 
//     '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/templates', 
//     '2', 
//     '/Library/Application Support/Adobe/CEP/extensions/FootballScheduler/CSV/Arizona Cardinals.csv')