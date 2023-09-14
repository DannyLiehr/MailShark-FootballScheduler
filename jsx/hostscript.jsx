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

function talkToPhotoshop(jsxPath, fbOptions, actDir, playDir, preseas) {

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
                    // links[i].relink(new File(playDir + "/FootballPlayer "+ curDate +".png"));
                    // new File("~/Downloads/FootballPlayer " + argv1 +" "+ argv3 + ".png");
                    links[i].relink(new File("~/Downloads/FootballPlayer " + fbOptions.name +" "+ fbOptions.number + ".png"));
                }
            }

            // hide all layers
            app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= false;
            app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= false;
            app.activeDocument.groups.itemByName("18 Games").visible= false;
            app.activeDocument.groups.itemByName("20 Games").visible= false;

            if (fbOptions.preseason == false){
                // No preseason. So show only the 18 games layer
                app.activeDocument.layers.itemByName("Schedule - 18 Games").visible= true;
                app.activeDocument.groups.itemByName("18 Games").visible= true;
            } else {
                // Preseason on. Show only the 20 games layer.
                app.activeDocument.layers.itemByName("Schedule - 20 Games").visible= true;
                app.activeDocument.groups.itemByName("20 Games").visible= true;
            }

            // app.activeDocument.packageForPrint(
            //     new File("~/Downloads"), // to: File
            //     true, // Copy Links
            //     true, // Copy Colour Profiles
            //     true, // Update graphics
            //     false, // Include Hidden Layers
            //     true, // Ignore Preflight errors. Maybe switch to false idk
            //     false, // Create report. Not needed here.
            //     false, // Include IDML. Not necessary imo
            //     true, // Include PDF
            //     "[High Quality Print]", // PDF style
            //     false, // Include Hyphenation
            //     "Football Schedule", // Version Comments
            //     [forceSave: true]
            // );  
            var templateDoc= app.activeDocument;

            app.activeDocument.dataMergeProperties.mergeRecords();
            // app.activeDocument.dataMergeProperties.dataMergeFields.everyItem;

            templateDoc.close(
                SaveOptions.NO
                );
            alert("The football image you selected is currently placed in your Downloads folder. Please move this football image into your active project and re-link it when you are able to.")

        };
        // On error...
        bt.onError = function (err) {
            alert("Oops! Error: " + err.body);
        }
        // Bombs away...
        alert("Photoshop is about to open to generate a schedule image. You may need to click on it on the dock to continue generating a schedule.");
        bt.send();

}
